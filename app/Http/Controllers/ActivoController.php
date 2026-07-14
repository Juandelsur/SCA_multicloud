<?php

namespace App\Http\Controllers;

use App\Http\Requests\EtiquetasRequest;
use App\Http\Requests\MovilizarActivoRequest;
use App\Http\Requests\StoreActivoRequest;
use App\Http\Requests\UpdateActivoRequest;
use App\Models\Activo;
use App\Models\AuditoriaLog;
use App\Models\EstadoActivo;
use App\Models\HistorialMovimiento;
use App\Models\TipoEquipo;
use App\Models\Ubicacion;
use App\Services\QrService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ActivoController extends Controller
{
    use AuthorizesRequests;

    public function index(): Response
    {
        $this->authorize('viewAny', Activo::class);

        $activos = Activo::with(['tipo', 'estado', 'ubicacionActual.departamento'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Activos/Index', ['activos' => $activos]);
    }

    public function create(): Response
    {
        $this->authorize('create', Activo::class);

        return Inertia::render('Activos/Create', [
            'tipos'       => TipoEquipo::all(),
            'estados'     => EstadoActivo::all(),
            'ubicaciones' => Ubicacion::with('departamento')->get(),
        ]);
    }

    public function store(StoreActivoRequest $request): RedirectResponse
    {
        $fotoPath = null;

        // La foto se sube ANTES de crear el registro: el nombre del archivo
        // no depende de codigo_inventario (se autogenera recién en el evento
        // `creating` del modelo), así que store() en el disco genera su propio
        // nombre único. Sin prefijo de carpeta: el contenedor de Azure configurado
        // en AZURE_STORAGE_CONTAINER ya es "activos", así que un prefijo adicional
        // duplicaría la ruta (activos/activos/...).
        if ($request->hasFile('foto')) {
            try {
                $fotoPath = $request->file('foto')->store('', 'azure');
            } catch (\Throwable $e) {
                return back()
                    ->withErrors(['foto' => 'No se pudo subir la fotografía. Intenta nuevamente.'])
                    ->withInput();
            }
        }

        try {
            $activo = Activo::create([
                ...$request->safe()->except(['foto']),
                'foto_path' => $fotoPath,
            ]);
        } catch (QueryException $e) {
            // Si la foto sí se subió pero el registro no se pudo crear, no dejar el blob huérfano.
            if ($fotoPath) {
                try {
                    Storage::disk('azure')->delete($fotoPath);
                } catch (\Throwable $ignored) {
                    // no-op
                }
            }

            return back()->with('error', 'No se pudo crear el activo. Verifica los datos e intenta nuevamente.')->withInput();
        }

        AuditoriaLog::registrar(auth()->user(), 'CREATE', [
            'modelo' => 'Activo',
            'id'     => $activo->id,
            'codigo' => $activo->codigo_inventario,
        ]);

        // back() en vez de redirect a activos.show: mantiene al usuario en la
        // página desde la que creó el activo (p.ej. /gestion/activos con sus filtros).
        return back()->with('success', 'Activo creado correctamente.');
    }

    public function show(Activo $activo): Response
    {
        $this->authorize('view', $activo);

        $activo->load([
            'tipo',
            'estado',
            'ubicacionActual.departamento',
            'historialMovimientos' => fn ($q) => $q->with(['ubicacionOrigen', 'ubicacionDestino', 'usuarioRegistra'])->latest()->limit(20),
        ]);

        return Inertia::render('Activos/Show', [
            'activo'      => $activo,
            'foto_url'    => $activo->fotoUrl(),
            'ubicaciones' => Ubicacion::with('departamento:id,nombre_departamento')
                ->orderBy('nombre_ubicacion')
                ->get(['id', 'nombre_ubicacion', 'departamento_id']),
            'toast'       => request('toast'),
        ]);
    }

    public function edit(Activo $activo): Response
    {
        $this->authorize('update', $activo);

        return Inertia::render('Activos/Edit', [
            'activo'      => $activo->load('tipo', 'estado', 'ubicacionActual'),
            'tipos'       => TipoEquipo::all(),
            'estados'     => EstadoActivo::all(),
            'ubicaciones' => Ubicacion::with('departamento')->get(),
        ]);
    }

    public function update(UpdateActivoRequest $request, Activo $activo): RedirectResponse
    {
        // codigo_inventario no está en las reglas de UpdateActivoRequest, así que
        // $request->safe() ya lo excluye aunque el cliente lo mande: nunca se pisa.
        $data = $request->safe()->except(['foto', 'eliminar_foto']);

        if ($request->hasFile('foto')) {
            // Caso A: viene un archivo nuevo -> reemplaza (borra el blob anterior si existía).
            if ($activo->foto_path) {
                try {
                    Storage::disk('azure')->delete($activo->foto_path);
                } catch (\Throwable $e) {
                    // no bloquea el reemplazo si el blob viejo ya no existe
                }
            }

            try {
                $data['foto_path'] = $request->file('foto')->store('', 'azure');
            } catch (\Throwable $e) {
                return back()
                    ->withErrors(['foto' => 'No se pudo subir la fotografía. Intenta nuevamente.'])
                    ->withInput();
            }
        } elseif ($request->boolean('eliminar_foto')) {
            // Caso B: se pidió eliminar la foto actual, sin reemplazo.
            if ($activo->foto_path) {
                try {
                    Storage::disk('azure')->delete($activo->foto_path);
                } catch (\Throwable $e) {
                    // no bloquea si el blob ya no existe
                }
            }

            $data['foto_path'] = null;
        }
        // Caso C (ninguno de los anteriores): $data no toca 'foto_path' — permanece intacto.

        try {
            $activo->update($data);
        } catch (QueryException $e) {
            return back()->with('error', 'No se pudo actualizar el activo. Verifica los datos e intenta nuevamente.')->withInput();
        }

        AuditoriaLog::registrar(auth()->user(), 'UPDATE', [
            'modelo' => 'Activo',
            'id'     => $activo->id,
        ]);

        return back()->with('success', 'Activo actualizado correctamente.');
    }

    public function destroy(Activo $activo): RedirectResponse
    {
        $this->authorize('delete', $activo);

        if ($activo->foto_path) {
            try {
                Storage::disk('azure')->delete($activo->foto_path);
            } catch (\Throwable $e) {
                // No bloquea el borrado del registro si el blob ya no existe o falla la conexión.
            }
        }

        try {
            $activo->delete();
        } catch (QueryException $e) {
            return back()->with('error', 'No se puede eliminar este activo: tiene movimientos u otros registros asociados en su historial.');
        }

        AuditoriaLog::registrar(auth()->user(), 'DELETE', [
            'modelo' => 'Activo',
            'id'     => $activo->id,
            'codigo' => $activo->codigo_inventario,
        ]);

        // back() en vez de redirect a activos.index: mantiene al usuario en la
        // página desde la que eliminó (p.ej. /gestion/activos con sus filtros).
        return back()->with('success', 'Activo eliminado correctamente.');
    }

    /** Moviliza un activo: actualiza ubicación, registra historial y auditoría en una transacción. */
    public function movilizar(MovilizarActivoRequest $request, Activo $activo): RedirectResponse
    {
        $validated = $request->validated();
        $origenId  = $activo->ubicacion_actual_id;
        $destinoId = $validated['ubicacion_destino_id'];

        abort_if($origenId === $destinoId, 422, 'El destino debe ser distinto a la ubicación actual.');

        DB::transaction(function () use ($activo, $validated, $origenId, $destinoId): void {
            // Paso 1: actualizar ubicación actual del activo.
            $activo->update(['ubicacion_actual_id' => $destinoId]);

            // Paso 2: registrar en historial de movimientos.
            HistorialMovimiento::create([
                'activo_id'            => $activo->id,
                'usuario_registra_id'  => auth()->id(),
                'ubicacion_origen_id'  => $origenId,
                'ubicacion_destino_id' => $destinoId,
                'tipo_movimiento'      => $validated['tipo_movimiento'] ?? 'TRASLADO',
                'comentarios'          => $validated['comentarios'] ?? null,
            ]);

            // Paso 3: registrar en auditoría.
            AuditoriaLog::registrar(auth()->user(), 'UPDATE', [
                'accion'               => 'movilizar',
                'activo_id'            => $activo->id,
                'ubicacion_origen_id'  => $origenId,
                'ubicacion_destino_id' => $destinoId,
            ]);
        });

        return redirect()->route('activos.show', [$activo->id, 'toast' => 'Activo movilizado correctamente.']);
    }

    /** Devuelve los datos de etiqueta + QR en SVG para cada activo seleccionado (endpoint JSON). */
    public function etiquetas(EtiquetasRequest $request): JsonResponse
    {
        $activos = $this->resolverSeleccionActivos($request);

        $etiquetas = $activos->map(fn (Activo $activo): array => [
            'activo'    => $activo->only(['id', 'codigo_inventario', 'numero_serie', 'marca', 'modelo']),
            'ubicacion' => optional($activo->ubicacionActual)->nombre_ubicacion,
            'qr_svg'    => QrService::generarSvg($activo->codigo_inventario),
        ]);

        return response()->json(['etiquetas' => $etiquetas]);
    }

    /**
     * Genera y descarga el PDF de etiquetas con QR para los activos filtrados.
     * Cada etiqueta incluye: QR (PNG), código de inventario, marca/modelo, n° serie y ubicación.
     */
    public function etiquetasPdf(EtiquetasRequest $request): HttpResponse
    {
        $activos = $this->resolverSeleccionActivos($request);

        $etiquetas = $activos->map(fn (Activo $activo): array => [
            'codigo_inventario' => $activo->codigo_inventario,
            'numero_serie'      => $activo->numero_serie,
            'marca'             => $activo->marca,
            'modelo'            => $activo->modelo,
            'ubicacion'         => optional($activo->ubicacionActual)->nombre_ubicacion,
            'departamento'      => optional(optional($activo->ubicacionActual)->departamento)->nombre_departamento,
            // PNG base64 para dompdf (soporte SVG limitado en el motor de renderizado).
            'qr_png'            => QrService::generarPngBase64($activo->codigo_inventario),
        ]);

        $pdf = Pdf::loadView('etiquetas.activos', ['etiquetas' => $etiquetas])
            ->setPaper('a4', 'portrait');

        $nombreArchivo = 'etiquetas-activos-'.now()->format('Y-m-d').'.pdf';

        return $pdf->download($nombreArchivo);
    }

    /** Resuelve qué activos imprimir según los filtros del request con eager loading completo. */
    private function resolverSeleccionActivos(EtiquetasRequest $request): \Illuminate\Database\Eloquent\Collection
    {
        $query = Activo::with('ubicacionActual.departamento');

        if ($request->filled('activo_ids')) {
            $query->whereIn('id', $request->input('activo_ids'));
        } elseif ($request->filled('ubicacion_id')) {
            $query->where('ubicacion_actual_id', $request->integer('ubicacion_id'));
        } elseif ($request->filled('departamento_id')) {
            $query->whereHas('ubicacionActual', fn ($q) => $q->where('departamento_id', $request->integer('departamento_id')));
        } else {
            $query->limit(50);
        }

        return $query->get();
    }
}
