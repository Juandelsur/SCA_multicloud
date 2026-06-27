<?php

namespace App\Http\Controllers;

use App\Models\HistorialMovimiento;
use Inertia\Inertia;
use Inertia\Response;

class HistorialController extends Controller
{
    public function index(): Response
    {
        $historial = HistorialMovimiento::with([
            'activo',
            'usuarioRegistra',
            'ubicacionOrigen',
            'ubicacionDestino',
        ])
            ->latest()
            ->paginate(30);

        return Inertia::render('Historial/Index', ['historial' => $historial]);
    }

    public function show(HistorialMovimiento $historialMovimiento): Response
    {
        $historialMovimiento->load([
            'activo.tipo',
            'activo.estado',
            'usuarioRegistra',
            'ubicacionOrigen.departamento',
            'ubicacionDestino.departamento',
        ]);

        return Inertia::render('Historial/Show', ['movimiento' => $historialMovimiento]);
    }
}
