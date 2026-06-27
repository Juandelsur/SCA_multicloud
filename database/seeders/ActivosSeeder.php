<?php

namespace Database\Seeders;

use App\Models\Activo;
use Illuminate\Database\Seeder;

/**
 * No usa WithoutModelEvents para que Activo genere su codigo_inventario automáticamente.
 */
class ActivosSeeder extends Seeder
{
    public function run(): void
    {
        Activo::factory(25)->create();

        $this->command->info('25 activos Faker sembrados.');
    }
}
