<?php

namespace App\Policies;

use App\Models\Activo;
use App\Models\User;

class ActivoPolicy
{
    /** Cualquier usuario autenticado puede listar activos. */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /** Cualquier usuario autenticado puede ver el detalle de un activo. */
    public function view(User $user, Activo $activo): bool
    {
        return true;
    }

    /** Solo usuarios con permiso activos.crear pueden registrar activos nuevos. */
    public function create(User $user): bool
    {
        return $user->can('activos.crear');
    }

    /** Solo usuarios con permiso activos.editar pueden modificar un activo. */
    public function update(User $user, Activo $activo): bool
    {
        return $user->can('activos.editar');
    }

    /** Solo usuarios con permiso activos.eliminar pueden dar de baja un activo. */
    public function delete(User $user, Activo $activo): bool
    {
        return $user->can('activos.eliminar');
    }

    /** Solo usuarios con permiso activos.movilizar pueden trasladar un activo. */
    public function movilizar(User $user, Activo $activo): bool
    {
        return $user->can('activos.movilizar');
    }
}
