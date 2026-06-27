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

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

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
        Route::post('activos/{activo}/movilizar', [ActivoController::class, 'movilizar'])->name('activos.movilizar');
    });

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

require __DIR__.'/settings.php';
