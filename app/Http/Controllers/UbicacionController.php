<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUbicacionRequest;
use App\Http\Requests\UpdateUbicacionRequest;
use App\Models\Departamento;
use App\Models\Ubicacion;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UbicacionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Ubicaciones/Index', [
            'ubicaciones' => Ubicacion::with('departamento')->withCount('activos')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Ubicaciones/Create', [
            'departamentos' => Departamento::all(),
        ]);
    }

    public function store(StoreUbicacionRequest $request): RedirectResponse
    {
        Ubicacion::create($request->validated());

        return redirect()->route('ubicaciones.index')
            ->with('success', 'Ubicación creada correctamente.');
    }

    public function show(Ubicacion $ubicacion): Response
    {
        return Inertia::render('Ubicaciones/Show', [
            'ubicacion' => $ubicacion->load(['departamento', 'activos.tipo', 'activos.estado']),
        ]);
    }

    public function edit(Ubicacion $ubicacion): Response
    {
        return Inertia::render('Ubicaciones/Edit', [
            'ubicacion'     => $ubicacion->load('departamento'),
            'departamentos' => Departamento::all(),
        ]);
    }

    public function update(UpdateUbicacionRequest $request, Ubicacion $ubicacion): RedirectResponse
    {
        $ubicacion->update($request->validated());

        return redirect()->route('ubicaciones.index')
            ->with('success', 'Ubicación actualizada correctamente.');
    }

    public function destroy(Ubicacion $ubicacion): RedirectResponse
    {
        $ubicacion->delete();

        return redirect()->route('ubicaciones.index')
            ->with('success', 'Ubicación eliminada correctamente.');
    }
}
