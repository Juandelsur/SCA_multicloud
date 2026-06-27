<?php

namespace Database\Seeders;

use App\Models\Departamento;
use App\Models\EstadoActivo;
use App\Models\TipoEquipo;
use App\Models\Ubicacion;
use Illuminate\Database\Seeder;

/**
 * Siembra catálogos fijos: estados, tipos, departamentos y ubicaciones.
 * No usa WithoutModelEvents para que Ubicacion genere su codigo_qr automáticamente.
 */
class MaestrosSeeder extends Seeder
{
    public function run(): void
    {
        // --- Estados del activo ---
        $estados = ['Operativo', 'En Mantención', 'En Reparación', 'De Baja'];
        foreach ($estados as $nombre) {
            EstadoActivo::firstOrCreate(['nombre_estado' => $nombre]);
        }

        // --- Tipos de equipo ---
        $tipos = ['Monitor', 'Computador', 'Impresora', 'Equipo Médico', 'Teléfono'];
        foreach ($tipos as $nombre) {
            TipoEquipo::firstOrCreate(['nombre_tipo' => $nombre]);
        }

        // --- Departamentos y sus ubicaciones ---
        $estructura = [
            'Urgencias' => ['Box 1', 'Box 2'],
            'Pabellón'  => ['Pabellón 1', 'Sala Recuperación'],
            'UCI'       => ['UCI Central', 'UCI Norte'],
        ];

        foreach ($estructura as $nombreDepto => $ubicaciones) {
            $depto = Departamento::firstOrCreate(['nombre_departamento' => $nombreDepto]);

            foreach ($ubicaciones as $nombreUbic) {
                Ubicacion::firstOrCreate(
                    ['nombre_ubicacion' => $nombreUbic, 'departamento_id' => $depto->id],
                );
            }
        }

        $this->command->info('Maestros sembrados: 4 estados, 5 tipos, 3 departamentos, 6 ubicaciones.');
    }
}
