<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolesPermisosSeeder::class,  // 1. Roles + permisos (spatie)
            MaestrosSeeder::class,       // 2. Estados, tipos, departamentos, ubicaciones
            UsuariosSeeder::class,       // 3. Usuarios demo con roles
            ActivosSeeder::class,        // 4. 25 activos con Faker
            MovimientosSeeder::class,    // 5. 12 movimientos históricos coherentes
        ]);
    }
}
