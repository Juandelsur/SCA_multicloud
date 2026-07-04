<?php

use App\Http\Controllers\ActivoController;
use App\Http\Controllers\AuditoriaController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\EstadoActivoController;
use App\Http\Controllers\HistorialController;
use App\Http\Controllers\TipoEquipoController;
use App\Http\Controllers\UbicacionController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('role:Administrador')->get('dashboard', function () {
        $totalActivos   = \App\Models\Activo::count();
        $totalUsuarios  = \App\Models\User::count();
        $movimientosMes = \App\Models\HistorialMovimiento::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $activosPorEstado = \App\Models\Activo::with('estado:id,nombre_estado')
            ->get(['id', 'estado_id'])
            ->groupBy('estado_id')
            ->map(fn ($g) => [
                'nombre' => $g->first()->estado?->nombre_estado ?? 'Sin estado',
                'total'  => $g->count(),
            ])->values();

        $ultimosMovimientos = \App\Models\HistorialMovimiento::with([
            'activo:id,codigo_inventario,marca,modelo',
            'ubicacionOrigen:id,nombre_ubicacion',
            'ubicacionDestino:id,nombre_ubicacion',
            'usuarioRegistra:id,name',
        ])->latest()->take(10)->get();

        $usuariosRecientes = \App\Models\User::with('roles:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at']);

        $usuariosPorRol = \Spatie\Permission\Models\Role::withCount('users')
            ->get()
            ->map(fn ($r) => ['nombre' => $r->name, 'total' => $r->users_count])
            ->values();

        return inertia('Admin/Home', compact(
            'totalActivos', 'totalUsuarios', 'movimientosMes',
            'activosPorEstado', 'ultimosMovimientos',
            'usuariosRecientes', 'usuariosPorRol'
        ));
    })->name('dashboard');

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
    Route::get('/jefe', function () {
        $totalActivos   = \App\Models\Activo::count();
        $totalUsuarios  = \App\Models\User::count();
        $movimientosMes = \App\Models\HistorialMovimiento::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        $activosPorEstado = \App\Models\Activo::with('estado:id,nombre_estado')
            ->get(['id', 'estado_id'])
            ->groupBy('estado_id')
            ->map(fn ($g) => [
                'nombre' => $g->first()->estado?->nombre_estado ?? 'Sin estado',
                'total'  => $g->count(),
            ])->values();

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

        $ultimosMovimientos = \App\Models\HistorialMovimiento::with([
            'activo:id,codigo_inventario,marca,modelo',
            'ubicacionOrigen:id,nombre_ubicacion',
            'ubicacionDestino:id,nombre_ubicacion',
            'usuarioRegistra:id,name',
        ])->latest()->take(10)->get();

        $usuariosPorRol = \Spatie\Permission\Models\Role::withCount('users')
            ->get()
            ->map(fn ($r) => ['nombre' => $r->name, 'total' => $r->users_count])
            ->values();

        return inertia('Jefe/Home', compact(
            'totalActivos', 'totalUsuarios', 'movimientosMes',
            'activosPorEstado', 'activosPorTipo', 'activosPorDepartamento',
            'ultimosMovimientos', 'usuariosPorRol'
        ));
    })->name('jefe.home');
});

require __DIR__.'/settings.php';
