<?php

use App\Http\Controllers\ActivoController;
use App\Http\Controllers\AuditoriaController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\EstadoActivoController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\TipoEquipoController;
use App\Http\Controllers\UbicacionController;
use App\Http\Controllers\UsuarioController;
use App\Services\ReportesService;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('role:Administrador')->group(function () {
        Route::get('dashboard', function (\Illuminate\Http\Request $request, ReportesService $reportes) {
            $totalActivos = \App\Models\Activo::count();

            $estadosGlobal = $reportes->activosPorEstado();

            $ubicaciones = \App\Models\Ubicacion::with('departamento:id,nombre_departamento')
                ->get(['id', 'nombre_ubicacion', 'departamento_id'])
                ->map(fn ($u) => [
                    'id'    => $u->id,
                    'label' => ($u->departamento?->nombre_departamento ?? 'Sin depto.').' - '.$u->nombre_ubicacion,
                ])
                ->sortBy('label')
                ->values();

            $ubicacionId = $request->integer('ubicacion_id') ?: null;

            if ($ubicacionId) {
                $estadosUbicacion   = $reportes->activosPorUbicacion($ubicacionId);
                $ultimosMovimientos = $reportes->movimientosRecientes($ubicacionId, 15);
            } else {
                $estadosUbicacion = $estadosGlobal->map(fn ($e) => [
                    'id' => $e['id'], 'nombre' => $e['nombre'], 'total' => $e['total'],
                ])->values();

                $ultimosMovimientos = $reportes->movimientosRecientes(null, 15);
            }

            // Temporal: confirma en logs si los datos vinieron del microservicio
            // o del fallback local, sin exponer nada al usuario. Sacar si genera
            // demasiado ruido en producción.
            \Illuminate\Support\Facades\Log::info('ReportesService — fuente de datos (Admin)', $reportes->fuentes());

            return inertia('Admin/Home', [
                'totalActivos'       => $totalActivos,
                'estadosGlobal'      => $estadosGlobal,
                'ubicaciones'        => $ubicaciones,
                'ubicacionId'        => $ubicacionId,
                'estadosUbicacion'   => $estadosUbicacion,
                'ultimosMovimientos' => $ultimosMovimientos,
            ]);
        })->name('dashboard');
    });

    // =========================================================
    // ACTIVOS
    // Las rutas estáticas (crear, etiquetas) van ANTES de {activo}
    // para evitar que el parámetro dinámico las capture primero.
    // =========================================================

    Route::get('activos', [ActivoController::class, 'index'])->name('activos.index');

    // Rutas estáticas de activos (deben preceder a activos/{activo})
    Route::middleware('permission:activos.crear')->group(function () {
        Route::get('activos/crear', [ActivoController::class, 'create'])->name('activos.create');
        Route::post('activos', [ActivoController::class, 'store'])->name('activos.store');
    });

    Route::middleware('permission:etiquetas.generar')->group(function () {
        Route::get('activos/etiquetas', [ActivoController::class, 'etiquetas'])->name('activos.etiquetas');
        Route::post('activos/etiquetas/pdf', [ActivoController::class, 'etiquetasPdf'])->name('activos.etiquetas.pdf');
    });

    // Rutas con parámetro dinámico {activo}
    Route::get('activos/{activo}', [ActivoController::class, 'show'])->name('activos.show');

    Route::middleware('permission:activos.editar')->group(function () {
        Route::get('activos/{activo}/editar', [ActivoController::class, 'edit'])->name('activos.edit');
        Route::put('activos/{activo}', [ActivoController::class, 'update'])->name('activos.update');
        Route::patch('activos/{activo}', [ActivoController::class, 'update']);
    });

    Route::middleware('permission:activos.eliminar')->group(function () {
        Route::delete('activos/{activo}', [ActivoController::class, 'destroy'])->name('activos.destroy');
    });

    Route::middleware('permission:activos.movilizar')->group(function () {
        Route::get('activos/{activo}/movilizar', function (\App\Models\Activo $activo) {
            $activo->load(['tipo', 'estado', 'ubicacionActual.departamento']);
            $ubicaciones = \App\Models\Ubicacion::with('departamento')
                ->orderBy('nombre_ubicacion')
                ->get(['id', 'nombre_ubicacion', 'departamento_id']);
            return inertia('Activos/Movilizar', [
                'activo'     => $activo,
                'ubicaciones' => $ubicaciones,
            ]);
        })->name('activos.movilizar.form');

        Route::post('activos/{activo}/movilizar', [ActivoController::class, 'movilizar'])->name('activos.movilizar');
    });

    Route::get('/api/activos/buscar', function (\Illuminate\Http\Request $request) {
        $codigo = strtoupper($request->query('codigo', ''));
        $activo = \App\Models\Activo::where('codigo_inventario', $codigo)->first();
        if (!$activo) return response()->json(['error' => 'No encontrado'], 404);
        return response()->json(['id' => $activo->id, 'codigo' => $activo->codigo_inventario]);
    })->name('api.activos.buscar');

    // =========================================================
    // HISTORIAL — todos los roles con permiso historial.ver
    // =========================================================
    Route::middleware('permission:historial.ver')->group(function () {
        Route::get('historial', [HistorialController::class, 'index'])->name('historial.index');
        Route::get('historial/{historialMovimiento}', [HistorialController::class, 'show'])->name('historial.show');
    });

    // =========================================================
    // AUDITORÍA — Administrador + Jefe
    // =========================================================
    Route::middleware('permission:auditoria.ver')->group(function () {
        Route::get('auditoria', [AuditoriaController::class, 'index'])->name('auditoria.index');
        Route::get('auditoria/{auditoriaLog}', [AuditoriaController::class, 'show'])->name('auditoria.show');

        // "Otros" del panel Admin: eventos de servicio-auditoria (microservicio),
        // no confundir con auditoria.index/show de arriba (AuditoriaLog propio de
        // Laravel). Bajo demanda: sin filtros, no se llama al microservicio.
        Route::get('dashboard/otros', function (\Illuminate\Http\Request $request) {
            $textoActivo = trim((string) $request->query('activo', ''));
            $accion      = trim((string) $request->query('accion', ''));
            $tieneFiltros = $textoActivo !== '' || $accion !== '';

            $eventos = null;
            $error   = null;

            if ($tieneFiltros) {
                $activoIds = null;

                if ($textoActivo !== '') {
                    $activoIds = \App\Models\Activo::where('codigo_inventario', 'ilike', "%{$textoActivo}%")
                        ->orWhere('marca', 'ilike', "%{$textoActivo}%")
                        ->orWhere('modelo', 'ilike', "%{$textoActivo}%")
                        ->limit(100)
                        ->pluck('id');
                }

                // Si el texto no matchea ningún activo, no hace falta ni llamar
                // al microservicio: la respuesta ya sabemos que es vacía.
                if ($activoIds !== null && $activoIds->isEmpty()) {
                    $eventos = [];
                } else {
                    $url = config('services.auditoria.url');

                    try {
                        $query = ['limit' => 200];

                        if ($accion !== '') {
                            $query['accion'] = $accion;
                        }

                        $response = \Illuminate\Support\Facades\Http::timeout(3)->get("{$url}/eventos", $query);

                        if ($response->successful()) {
                            $data = $response->json();

                            if ($activoIds !== null) {
                                $idsSet = $activoIds->all();
                                $data   = array_values(array_filter(
                                    $data,
                                    fn ($e) => in_array($e['activo_id'], $idsSet)
                                ));
                            }

                            // Enriquece con datos del activo (el microservicio solo
                            // guarda activo_id, no marca/modelo/código).
                            $idsEnEventos = collect($data)->pluck('activo_id')->unique()->values();
                            $activosMap   = \App\Models\Activo::whereIn('id', $idsEnEventos)
                                ->get(['id', 'codigo_inventario', 'marca', 'modelo'])
                                ->keyBy('id');

                            $eventos = collect($data)->map(function ($e) use ($activosMap) {
                                $a = $activosMap->get($e['activo_id']);
                                $e['activo'] = $a ? [
                                    'codigo_inventario' => $a->codigo_inventario,
                                    'marca'             => $a->marca,
                                    'modelo'            => $a->modelo,
                                ] : null;

                                return $e;
                            })->values()->all();
                        } else {
                            \Illuminate\Support\Facades\Log::warning('No se pudo cargar el historial desde servicio-auditoria', [
                                'accion' => $accion,
                                'status' => $response->status(),
                                'body' => $response->body(),
                            ]);
                            $error = 'No se pudo cargar el historial de auditoría en este momento.';
                        }
                    } catch (\Throwable $e) {
                        \Illuminate\Support\Facades\Log::warning('No se pudo cargar el historial desde servicio-auditoria', [
                            'accion' => $accion,
                            'error' => $e->getMessage(),
                        ]);
                        $error = 'No se pudo cargar el historial de auditoría en este momento.';
                    }
                }
            }

            return inertia('Admin/Otros', [
                'eventos' => $eventos,
                'error'   => $error,
                'filtros' => ['activo' => $textoActivo, 'accion' => $accion],
            ]);
        })->name('dashboard.otros');
    });

    // =========================================================
    // MAESTROS — solo Administrador
    // =========================================================
    Route::middleware('permission:maestros.gestionar')->group(function () {
        Route::resource('departamentos', DepartamentoController::class);
        Route::resource('ubicaciones', UbicacionController::class);
        Route::resource('tipos-equipo', TipoEquipoController::class);
        Route::resource('estados-activo', EstadoActivoController::class);
        Route::resource('usuarios', UsuarioController::class);
        Route::post('usuarios/{usuario}/rol', [UsuarioController::class, 'asignarRol'])->name('usuarios.rol');

        // ── Gestión de Entidades — grid de accesos con conteos reales ──
        Route::get('dashboard/gestion', function () {
            $entidades = [
                [
                    'nombre'      => 'Activos',
                    'descripcion' => 'Gestión de equipos e inventario',
                    'count'       => \App\Models\Activo::count(),
                    'color'       => 'blue',
                    'icono'       => 'Laptop',
                    'ruta'        => '/gestion/activos',
                ],
                [
                    'nombre'      => 'Estado Activos',
                    'descripcion' => 'Estados de los activos',
                    'count'       => \App\Models\EstadoActivo::count(),
                    'color'       => 'purple',
                    'icono'       => 'Share2',
                    'ruta'        => '/gestion/estados-activo',
                ],
                [
                    'nombre'      => 'Departamentos',
                    'descripcion' => 'Departamentos de la organización',
                    'count'       => \App\Models\Departamento::count(),
                    'color'       => 'teal',
                    'icono'       => 'Building2',
                    'ruta'        => '/gestion/departamentos',
                ],
                [
                    'nombre'      => 'Roles',
                    'descripcion' => 'Roles y permisos de usuarios',
                    'count'       => \Spatie\Permission\Models\Role::count(),
                    'color'       => 'orange',
                    'icono'       => 'ShieldUser',
                    'ruta'        => '/gestion/roles',
                ],
                [
                    'nombre'      => 'Tipos de Equipo',
                    'descripcion' => 'Categorías de equipos',
                    'count'       => \App\Models\TipoEquipo::count(),
                    'color'       => 'indigo',
                    'icono'       => 'MonitorSmartphone',
                    'ruta'        => '/gestion/tipos-equipo',
                ],
                [
                    'nombre'      => 'Ubicaciones',
                    'descripcion' => 'Ubicaciones físicas',
                    'count'       => \App\Models\Ubicacion::count(),
                    'color'       => 'red',
                    'icono'       => 'MapPin',
                    'ruta'        => '/gestion/ubicaciones',
                ],
                [
                    'nombre'      => 'Usuarios',
                    'descripcion' => 'Usuarios del sistema',
                    'count'       => \App\Models\User::count(),
                    'color'       => 'green',
                    'icono'       => 'Users',
                    'ruta'        => '/gestion/usuarios',
                ],
            ];

            return inertia('Admin/Gestion', ['entidades' => $entidades]);
        })->name('dashboard.gestion');

        // ── Gestión de Activos — listado con búsqueda/filtros bajo demanda ──
        Route::get('gestion/activos', function (\Illuminate\Http\Request $request) {
            $marcas = \App\Models\Activo::distinct()->pluck('marca')->filter()->sort()->values();

            $tipos = \App\Models\TipoEquipo::orderBy('nombre_tipo')->get(['id', 'nombre_tipo']);

            $estados = \App\Models\EstadoActivo::orderBy('nombre_estado')->get(['id', 'nombre_estado']);

            $ubicaciones = \App\Models\Ubicacion::with('departamento:id,nombre_departamento')
                ->get(['id', 'nombre_ubicacion', 'departamento_id'])
                ->map(fn ($u) => [
                    'id'    => $u->id,
                    'label' => ($u->departamento?->nombre_departamento ?? 'Sin depto.').' - '.$u->nombre_ubicacion,
                ])
                ->sortBy('label')
                ->values();

            $tieneFiltros = $request->filled('search')
                || $request->filled('marca')
                || $request->filled('tipo_id')
                || $request->filled('estado_id')
                || $request->filled('ubicacion_id');

            $activos = null;

            if ($tieneFiltros) {
                $query = \App\Models\Activo::with([
                    'tipo:id,nombre_tipo',
                    'estado:id,nombre_estado',
                    'ubicacionActual.departamento:id,nombre_departamento',
                ])->latest();

                if ($search = trim((string) $request->string('search'))) {
                    $query->where(function ($q) use ($search) {
                        $q->where('codigo_inventario', 'ilike', "%{$search}%")
                            ->orWhere('numero_serie', 'ilike', "%{$search}%")
                            ->orWhere('modelo', 'ilike', "%{$search}%");
                    });
                }

                if ($marca = (string) $request->string('marca')) {
                    $query->where('marca', $marca);
                }

                if ($tipoId = $request->integer('tipo_id')) {
                    $query->where('tipo_id', $tipoId);
                }

                if ($estadoId = $request->integer('estado_id')) {
                    $query->where('estado_id', $estadoId);
                }

                if ($ubicacionId = $request->integer('ubicacion_id')) {
                    $query->where('ubicacion_actual_id', $ubicacionId);
                }

                $activos = $query->paginate(20)->withQueryString();

                // La URL de Azure se resuelve acá (firmada, 30 min) para que el
                // modal "Ver" del frontend no dispare una consulta extra por fila.
                $activos->getCollection()->transform(function ($activo) {
                    $activo->foto_url = $activo->fotoUrl();

                    return $activo;
                });
            }

            return inertia('Gestion/Activos/Index', [
                'activos'     => $activos,
                'marcas'      => $marcas,
                'tipos'       => $tipos,
                'estados'     => $estados,
                'ubicaciones' => $ubicaciones,
                'filtros'     => $request->only(['search', 'marca', 'tipo_id', 'estado_id', 'ubicacion_id']),
            ]);
        })->name('gestion.activos');

        // ── Placeholders — CRUD real de cada entidad, iteración por iteración ──
        Route::get('gestion/estados-activo', fn () => inertia('Gestion/Placeholder', ['entidad' => 'Estado Activos']))->name('gestion.estadosActivo');
        Route::get('gestion/departamentos', fn () => inertia('Gestion/Placeholder', ['entidad' => 'Departamentos']))->name('gestion.departamentos');
        Route::get('gestion/roles', fn () => inertia('Gestion/Placeholder', ['entidad' => 'Roles']))->name('gestion.roles');
        Route::get('gestion/tipos-equipo', fn () => inertia('Gestion/Placeholder', ['entidad' => 'Tipos de Equipo']))->name('gestion.tiposEquipo');
        Route::get('gestion/ubicaciones', fn () => inertia('Gestion/Placeholder', ['entidad' => 'Ubicaciones']))->name('gestion.ubicaciones');
        Route::get('gestion/usuarios', fn () => inertia('Gestion/Placeholder', ['entidad' => 'Usuarios']))->name('gestion.usuarios');
    });
});

// =========================================================
// TÉCNICO — dashboard móvil del técnico hospitalario
// =========================================================
Route::middleware(['auth', 'role:Técnico'])->group(function () {
    Route::get('/tecnico', function () {
        $movimientos = \App\Models\HistorialMovimiento::with([
            'activo:id,codigo_inventario,marca,modelo',
            'ubicacionDestino:id,nombre_ubicacion',
            'usuarioRegistra:id,name',
        ])->latest()->take(10)->get();

        return inertia('Tecnico/Home', [
            'ultimosMovimientos' => $movimientos,
        ]);
    })->name('tecnico.home');

    Route::get('/tecnico/scan', function () {
        $ultimosMovimientos = \App\Models\HistorialMovimiento::with([
            'activo:id,codigo_inventario,marca,modelo',
            'usuarioRegistra:id,name',
            'ubicacionOrigen:id,nombre_ubicacion',
            'ubicacionDestino:id,nombre_ubicacion',
        ])->latest()->take(5)->get();

        return inertia('Tecnico/Scan', [
            'ultimosMovimientos' => $ultimosMovimientos,
        ]);
    })->name('tecnico.scan');

    Route::get('/tecnico/imprimir', function () {
        // Relaciones correctas del modelo Activo: tipo(), estado(), ubicacionActual()
        // FK columns: tipo_id, estado_id (no tipo_equipo_id/estado_activo_id)
        $activos = \App\Models\Activo::with([
            'ubicacionActual:id,nombre_ubicacion',
            'tipo:id,nombre_tipo',
            'estado:id,nombre_estado',
        ])->orderBy('marca')->get([
            'id', 'codigo_inventario', 'marca', 'modelo',
            'numero_serie', 'ubicacion_actual_id', 'tipo_id', 'estado_id',
        ]);

        $ubicaciones = \App\Models\Ubicacion::with('departamento:id,nombre_departamento')
            ->orderBy('nombre_ubicacion')
            ->get(['id', 'nombre_ubicacion', 'codigo_qr', 'departamento_id']);

        $departamentos = \App\Models\Departamento::orderBy('nombre_departamento')
            ->get(['id', 'nombre_departamento']);

        $marcas = \App\Models\Activo::distinct()->pluck('marca')->filter()->sort()->values();
        $tipos  = \App\Models\TipoEquipo::orderBy('nombre_tipo')->get(['id', 'nombre_tipo']);

        return inertia('Tecnico/Imprimir', compact(
            'activos', 'ubicaciones', 'departamentos', 'marcas', 'tipos'
        ));
    })->name('tecnico.imprimir');
});

// =========================================================
// JEFE — dashboard de solo lectura para jefatura
// =========================================================
Route::middleware(['auth', 'role:Jefe'])->group(function () {
    Route::get('/jefe', function (ReportesService $reportes) {
        $totalActivos   = \App\Models\Activo::count();
        $totalUsuarios  = \App\Models\User::count();
        $movimientosMes = \App\Models\HistorialMovimiento::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        // Jefe/Home no filtra por ubicación (no tiene ese select hoy, a
        // diferencia de Admin/Home) — se pide siempre el desglose global.
        $activosPorEstado = $reportes->activosPorEstado()
            ->map(fn ($e) => ['nombre' => $e['nombre'], 'total' => $e['total']])
            ->values();

        // servicio-reportes no tiene endpoint para "por tipo" ni "por
        // departamento" — quedan 100% locales, no hay nada que conectar acá.
        $activosPorTipo = \App\Models\Activo::with('tipo:id,nombre_tipo')
            ->get(['id', 'tipo_id'])
            ->groupBy('tipo_id')
            ->map(fn ($g) => [
                'nombre' => $g->first()->tipo?->nombre_tipo ?? 'Sin tipo',
                'total'  => $g->count(),
            ])->values();

        $activosPorDepartamento = \App\Models\Activo::with('ubicacionActual.departamento:id,nombre_departamento')
            ->get(['id', 'ubicacion_actual_id'])
            ->groupBy(fn ($a) => $a->ubicacionActual?->departamento?->nombre_departamento ?? 'Sin depto.')
            ->map(fn ($g, $nombre) => ['nombre' => $nombre, 'total' => $g->count()])
            ->values();

        $ultimosMovimientos = $reportes->movimientosRecientes(null, 10);

        $usuariosPorRol = \Spatie\Permission\Models\Role::withCount('users')
            ->get()
            ->map(fn ($r) => ['nombre' => $r->name, 'total' => $r->users_count])
            ->values();

        // Temporal: mismo diagnóstico que en /dashboard.
        \Illuminate\Support\Facades\Log::info('ReportesService — fuente de datos (Jefe)', $reportes->fuentes());

        return inertia('Jefe/Home', compact(
            'totalActivos', 'totalUsuarios', 'movimientosMes',
            'activosPorEstado', 'activosPorTipo', 'activosPorDepartamento',
            'ultimosMovimientos', 'usuariosPorRol'
        ));
    })->name('jefe.home');
});

require __DIR__.'/settings.php';
