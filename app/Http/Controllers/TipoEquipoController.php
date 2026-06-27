<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTipoEquipoRequest;
use App\Http\Requests\UpdateTipoEquipoRequest;
use App\Models\TipoEquipo;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TipoEquipoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('TiposEquipo/Index', [
            'tipos' => TipoEquipo::withCount('activos')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('TiposEquipo/Create');
    }

    public function store(StoreTipoEquipoRequest $request): RedirectResponse
    {
        TipoEquipo::create($request->validated());

        return redirect()->route('tipos-equipo.index')
            ->with('success', 'Tipo de equipo creado correctamente.');
    }

    public function show(TipoEquipo $tiposEquipo): Response
    {
        return Inertia::render('TiposEquipo/Show', [
            'tipo' => $tiposEquipo->load('activos'),
        ]);
    }

    public function edit(TipoEquipo $tiposEquipo): Response
    {
        return Inertia::render('TiposEquipo/Edit', [
            'tipo' => $tiposEquipo,
        ]);
    }

    public function update(UpdateTipoEquipoRequest $request, TipoEquipo $tiposEquipo): RedirectResponse
    {
        $tiposEquipo->update($request->validated());

        return redirect()->route('tipos-equipo.index')
            ->with('success', 'Tipo de equipo actualizado correctamente.');
    }

    public function destroy(TipoEquipo $tiposEquipo): RedirectResponse
    {
        $tiposEquipo->delete();

        return redirect()->route('tipos-equipo.index')
            ->with('success', 'Tipo de equipo eliminado correctamente.');
    }
}
