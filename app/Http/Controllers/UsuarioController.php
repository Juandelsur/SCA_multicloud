<?php

namespace App\Http\Controllers;

use App\Http\Requests\AsignarRolRequest;
use App\Http\Requests\StoreUsuarioRequest;
use App\Http\Requests\UpdateUsuarioRequest;
use App\Models\AuditoriaLog;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UsuarioController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Usuarios/Index', [
            'usuarios' => User::with('roles')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Usuarios/Create', [
            'roles' => Role::all()->pluck('name'),
        ]);
    }

    public function store(StoreUsuarioRequest $request): RedirectResponse
    {
        $datos = $request->validated();
        $rol   = $datos['rol'];

        $usuario = User::create([
            'name'            => $datos['name'],
            'nombre_completo' => $datos['nombre_completo'],
            'email'           => $datos['email'],
            'password'        => Hash::make($datos['password']),
        ]);

        $usuario->assignRole($rol);

        AuditoriaLog::registrar(auth()->user(), 'CREATE', [
            'modelo' => 'User',
            'id'     => $usuario->id,
            'email'  => $usuario->email,
        ]);

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuario creado correctamente.');
    }

    public function show(User $usuario): Response
    {
        return Inertia::render('Usuarios/Show', [
            'usuario' => $usuario->load('roles'),
        ]);
    }

    public function edit(User $usuario): Response
    {
        return Inertia::render('Usuarios/Edit', [
            'usuario' => $usuario->load('roles'),
            'roles'   => Role::all()->pluck('name'),
        ]);
    }

    public function update(UpdateUsuarioRequest $request, User $usuario): RedirectResponse
    {
        $datos = $request->validated();

        $usuario->update([
            'name'            => $datos['name'],
            'nombre_completo' => $datos['nombre_completo'],
            'email'           => $datos['email'],
        ]);

        if (! empty($datos['password'])) {
            $usuario->update(['password' => Hash::make($datos['password'])]);
        }

        AuditoriaLog::registrar(auth()->user(), 'UPDATE', [
            'modelo' => 'User',
            'id'     => $usuario->id,
        ]);

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy(User $usuario): RedirectResponse
    {
        AuditoriaLog::registrar(auth()->user(), 'DELETE', [
            'modelo' => 'User',
            'id'     => $usuario->id,
            'email'  => $usuario->email,
        ]);

        $usuario->delete();

        return redirect()->route('usuarios.index')
            ->with('success', 'Usuario eliminado correctamente.');
    }

    /** Cambia el rol del usuario, reemplazando cualquier rol previo. */
    public function asignarRol(AsignarRolRequest $request, User $usuario): RedirectResponse
    {
        $usuario->syncRoles([$request->validated('rol')]);

        AuditoriaLog::registrar(auth()->user(), 'UPDATE', [
            'accion'   => 'asignar_rol',
            'usuario'  => $usuario->id,
            'nuevo_rol' => $request->validated('rol'),
        ]);

        return redirect()->route('usuarios.show', $usuario)
            ->with('success', 'Rol actualizado correctamente.');
    }
}
