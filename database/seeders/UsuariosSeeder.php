<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $usuarios = [
            [
                'name'           => 'admin',
                'nombre_completo' => 'Administrador Sistema',
                'email'          => 'admin@sca.cl',
                'rol'            => 'Administrador',
            ],
            [
                'name'           => 'tecnico',
                'nombre_completo' => 'Técnico Soporte',
                'email'          => 'tecnico@sca.cl',
                'rol'            => 'Técnico',
            ],
            [
                'name'           => 'jefe',
                'nombre_completo' => 'Jefe Informática',
                'email'          => 'jefe@sca.cl',
                'rol'            => 'Jefe',
            ],
        ];

        foreach ($usuarios as $datos) {
            $rol = $datos['rol'];
            unset($datos['rol']);

            $usuario = User::firstOrCreate(
                ['email' => $datos['email']],
                array_merge($datos, [
                    'email_verified_at' => now(),
                    'password'          => Hash::make('password'),
                ]),
            );

            // Asigna el rol solo si aún no lo tiene (idempotente).
            if (! $usuario->hasRole($rol)) {
                $usuario->assignRole($rol);
            }
        }

        $this->command->info('Usuarios demo sembrados: admin@sca.cl, tecnico@sca.cl, jefe@sca.cl (password: password).');
    }
}
