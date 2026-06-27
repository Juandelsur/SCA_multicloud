<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartamentoRequest;
use App\Http\Requests\UpdateDepartamentoRequest;
use App\Models\Departamento;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartamentoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Departamentos/Index', [
            'departamentos' => Departamento::withCount('ubicaciones')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Departamentos/Create');
    }

    public function store(StoreDepartamentoRequest $request): RedirectResponse
    {
        Departamento::create($request->validated());

        return redirect()->route('departamentos.index')
            ->with('success', 'Departamento creado correctamente.');
    }

    public function show(Departamento $departamento): Response
    {
        return Inertia::render('Departamentos/Show', [
            'departamento' => $departamento->load('ubicaciones'),
        ]);
    }

    public function edit(Departamento $departamento): Response
    {
        return Inertia::render('Departamentos/Edit', [
            'departamento' => $departamento,
        ]);
    }

    public function update(UpdateDepartamentoRequest $request, Departamento $departamento): RedirectResponse
    {
        $departamento->update($request->validated());

        return redirect()->route('departamentos.index')
            ->with('success', 'Departamento actualizado correctamente.');
    }

    public function destroy(Departamento $departamento): RedirectResponse
    {
        $departamento->delete();

        return redirect()->route('departamentos.index')
            ->with('success', 'Departamento eliminado correctamente.');
    }
}
