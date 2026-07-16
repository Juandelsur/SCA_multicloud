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
        $config = [
            'Administrador' => ['prefijo' => 'admin', 'cantidad' => 2, 'nombre_base' => 'Administrador'],
            'Técnico'       => ['prefijo' => 'tecnico', 'cantidad' => 5, 'nombre_base' => 'Técnico'],
            'Jefe'          => ['prefijo' => 'jefe', 'cantidad' => 5, 'nombre_base' => 'Jefe'],
        ];

        $credenciales = [];

        foreach ($config as $rol => $datos) {
            for ($n = 1; $n <= $datos['cantidad']; $n++) {
                $email    = "{$datos['prefijo']}{$n}@sca.cl";
                $password = "{$datos['prefijo']}{$n}123";

                $usuario = User::firstOrCreate(
                    ['email' => $email],
                    [
                        'name'              => "{$datos['prefijo']}{$n}",
                        'nombre_completo'   => "{$datos['nombre_base']} {$n}",
                        'email_verified_at' => now(),
                        'password'          => Hash::make($password),
                    ],
                );

                // Asigna el rol solo si aún no lo tiene (idempotente).
                if (! $usuario->hasRole($rol)) {
                    $usuario->assignRole($rol);
                }

                $credenciales[] = [$rol, $email, $password];
            }
        }

        $this->command->info('Usuarios demo sembrados correctamente.');
        $this->command->table(['Rol', 'Email', 'Password'], $credenciales);
    }
}
