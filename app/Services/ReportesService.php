<?php

namespace App\Services;

use App\Models\Activo;
use App\Models\EstadoActivo;
use App\Models\HistorialMovimiento;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Capa de adaptación sobre servicio-reportes: sus 3 endpoints devuelven un
 * shape distinto al que ya consumen Admin/Home.tsx y Jefe/Home.tsx (nombres
 * de campo, estructura plana vs. anidada, sin id de estado, sin
 * ubicacion_origen). Cada método reordena la respuesta del microservicio al
 * shape local EXACTO, y si el microservicio falla, cae a la query Eloquent
 * original (que se conserva tal cual, ahora como fallback) — a diferencia de
 * AuditoriaService, estos dashboards no pueden quedar vacíos ni romperse.
 */
class ReportesService
{
    private bool $fallbackLogueado = false;

    /** @var array<string, string> Diagnóstico de qué fuente usó cada método en este request. */
    private array $fuentes = [];

    public function activosPorEstado(): Collection
    {
        try {
            $response = Http::timeout(3)
                ->get(config('services.reportes.url').'/activos-por-estado')
                ->throw();

            $this->fuentes['activosPorEstado'] = 'microservicio';

            return $this->adaptarEstados($response->json(), incluirPorcentaje: true);
        } catch (Throwable $e) {
            $this->logFallback($e);
            $this->fuentes['activosPorEstado'] = 'local';

            return $this->activosPorEstadoLocal();
        }
    }

    public function activosPorUbicacion(?int $ubicacionId): Collection
    {
        try {
            $query    = $ubicacionId ? ['ubicacion_id' => $ubicacionId] : [];
            $response = Http::timeout(3)
                ->get(config('services.reportes.url').'/activos-por-ubicacion', $query)
                ->throw();

            $this->fuentes['activosPorUbicacion'] = 'microservicio';

            return $this->adaptarEstados($response->json(), incluirPorcentaje: false);
        } catch (Throwable $e) {
            $this->logFallback($e);
            $this->fuentes['activosPorUbicacion'] = 'local';

            return $this->activosPorUbicacionLocal($ubicacionId);
        }
    }

    public function movimientosRecientes(?int $ubicacionId, int $limit = 15): Collection
    {
        try {
            $query = ['limit' => $limit];

            if ($ubicacionId) {
                $query['ubicacion_id'] = $ubicacionId;
            }

            $response = Http::timeout(3)
                ->get(config('services.reportes.url').'/movimientos-recientes', $query)
                ->throw();

            $this->fuentes['movimientosRecientes'] = 'microservicio';

            return collect($response->json())->map(fn ($m) => [
                'id'                => $m['id'],
                'tipo_movimiento'   => $m['tipo_movimiento'],
                'created_at'        => $m['created_at'],
                'activo'            => [
                    'codigo_inventario' => $m['codigo_inventario'],
                    'marca'             => $m['marca'],
                    'modelo'            => $m['modelo'],
                ],
                // No disponible en servicio-reportes (no lo hace join); ningún
                // .tsx lo renderiza hoy, solo está tipado — impacto nulo.
                'ubicacion_origen'  => null,
                'ubicacion_destino' => $m['ubicacion_destino'] ? ['nombre_ubicacion' => $m['ubicacion_destino']] : null,
                'usuario_registra'  => $m['usuario'] ? ['name' => $m['usuario']] : null,
            ])->values();
        } catch (Throwable $e) {
            $this->logFallback($e);
            $this->fuentes['movimientosRecientes'] = 'local';

            return $this->movimientosRecientesLocal($ubicacionId, $limit);
        }
    }

    /** Fuente usada (microservicio|local) por cada método llamado en este request — para diagnóstico. */
    public function fuentes(): array
    {
        return $this->fuentes;
    }

    /** @param array<int, array{estado: string, cantidad: int, porcentaje: float}> $filas */
    private function adaptarEstados(array $filas, bool $incluirPorcentaje): Collection
    {
        $idsPorNombre = EstadoActivo::pluck('id', 'nombre_estado');

        return collect($filas)->map(function ($f) use ($idsPorNombre, $incluirPorcentaje) {
            $fila = [
                'id'     => $idsPorNombre[$f['estado']] ?? null,
                'nombre' => $f['estado'],
                'total'  => $f['cantidad'],
            ];

            if ($incluirPorcentaje) {
                $fila['porcentaje'] = round($f['porcentaje']);
            }

            return $fila;
        })->values();
    }

    private function activosPorEstadoLocal(): Collection
    {
        $total = Activo::count();

        return EstadoActivo::withCount('activos')
            ->get(['id', 'nombre_estado'])
            ->map(fn ($e) => [
                'id'         => $e->id,
                'nombre'     => $e->nombre_estado,
                'total'      => $e->activos_count,
                'porcentaje' => $total > 0 ? round($e->activos_count / $total * 100) : 0,
            ])->values();
    }

    private function activosPorUbicacionLocal(?int $ubicacionId): Collection
    {
        return EstadoActivo::withCount(['activos' => function ($q) use ($ubicacionId) {
            if ($ubicacionId) {
                $q->where('ubicacion_actual_id', $ubicacionId);
            }
        }])
            ->get(['id', 'nombre_estado'])
            ->map(fn ($e) => ['id' => $e->id, 'nombre' => $e->nombre_estado, 'total' => $e->activos_count])
            ->values();
    }

    private function movimientosRecientesLocal(?int $ubicacionId, int $limit): Collection
    {
        $query = HistorialMovimiento::with([
            'activo:id,codigo_inventario,marca,modelo',
            'ubicacionOrigen:id,nombre_ubicacion',
            'ubicacionDestino:id,nombre_ubicacion',
            'usuarioRegistra:id,name',
        ])->latest();

        if ($ubicacionId) {
            $query->where('ubicacion_destino_id', $ubicacionId);
        }

        return $query->take($limit)->get();
    }

    private function logFallback(Throwable $e): void
    {
        if ($this->fallbackLogueado) {
            return;
        }

        $this->fallbackLogueado = true;

        Log::warning('Reportes service no disponible, usando fallback local', [
            'error' => $e->getMessage(),
        ]);
    }
}
