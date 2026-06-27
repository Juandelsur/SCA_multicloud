<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEstadoActivoRequest;
use App\Http\Requests\UpdateEstadoActivoRequest;
use App\Models\EstadoActivo;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EstadoActivoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('EstadosActivo/Index', [
            'estados' => EstadoActivo::withCount('activos')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('EstadosActivo/Create');
    }

    public function store(StoreEstadoActivoRequest $request): RedirectResponse
    {
        EstadoActivo::create($request->validated());

        return redirect()->route('estados-activo.index')
            ->with('success', 'Estado creado correctamente.');
    }

    public function show(EstadoActivo $estadosActivo): Response
    {
        return Inertia::render('EstadosActivo/Show', [
            'estado' => $estadosActivo->load('activos'),
        ]);
    }

    public function edit(EstadoActivo $estadosActivo): Response
    {
        return Inertia::render('EstadosActivo/Edit', [
            'estado' => $estadosActivo,
        ]);
    }

    public function update(UpdateEstadoActivoRequest $request, EstadoActivo $estadosActivo): RedirectResponse
    {
        $estadosActivo->update($request->validated());

        return redirect()->route('estados-activo.index')
            ->with('success', 'Estado actualizado correctamente.');
    }

    public function destroy(EstadoActivo $estadosActivo): RedirectResponse
    {
        $estadosActivo->delete();

        return redirect()->route('estados-activo.index')
            ->with('success', 'Estado eliminado correctamente.');
    }
}
