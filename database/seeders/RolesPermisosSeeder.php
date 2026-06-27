<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesPermisosSeeder extends Seeder
{
    public function run(): void
    {
        // Limpia caché de permisos para evitar inconsistencias al re-sembrar.
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // --- Permisos granulares ---
        $permisos = [
            'maestros.gestionar',  // CRUD de catálogos (deptos, ubicaciones, tipos, estados, usuarios)
            'activos.crear',
            'activos.editar',
            'activos.eliminar',
            'activos.movilizar',
            'historial.ver',
            'auditoria.ver',
            'etiquetas.generar',   // Generar e imprimir etiquetas QR de activos
        ];

        foreach ($permisos as $nombre) {
            Permission::firstOrCreate(['name' => $nombre]);
        }

        // --- Roles y asignación de permisos según matriz AGENTS.md §6.2 ---

        $administrador = Role::firstOrCreate(['name' => 'Administrador']);
        $administrador->syncPermissions([
            'maestros.gestionar',
            'activos.crear',
            'activos.editar',
            'activos.eliminar',
            'activos.movilizar',
            'historial.ver',
            'auditoria.ver',
            'etiquetas.generar',
        ]);

        $tecnico = Role::firstOrCreate(['name' => 'Técnico']);
        $tecnico->syncPermissions([
            'activos.crear',
            'activos.editar',
            'activos.movilizar',
            'historial.ver',
            'etiquetas.generar',
        ]);

        $jefe = Role::firstOrCreate(['name' => 'Jefe']);
        $jefe->syncPermissions([
            'historial.ver',
            'auditoria.ver',
            // Jefe puede ver activos e historial pero no generar etiquetas ni movilizar.
        ]);

        $this->command->info('Roles y permisos sembrados correctamente.');
    }
}
