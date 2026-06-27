<?php

namespace Database\Seeders;

use App\Models\Activo;
use App\Models\HistorialMovimiento;
use App\Models\Ubicacion;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovimientosSeeder extends Seeder
{
    use WithoutModelEvents;

    /** @var list<string> */
    private array $tipos = ['TRASLADO', 'ASIGNACION', 'DEVOLUCION', 'MANTENIMIENTO', 'RETORNO'];

    public function run(): void
    {
        // Solo Admin y Técnico pueden registrar movimientos.
        $registradores = User::role(['Administrador', 'Técnico'])->get();
        $ubicaciones   = Ubicacion::all();

        if ($registradores->isEmpty() || $ubicaciones->count() < 2) {
            $this->command->warn('No hay usuarios registradores o ubicaciones suficientes para sembrar movimientos.');

            return;
        }

        $activos = Activo::all();

        if ($activos->isEmpty()) {
            $this->command->warn('No hay activos para sembrar movimientos.');

            return;
        }

        for ($i = 0; $i < 12; $i++) {
            // Refresca el activo para obtener su ubicación actual tras movimientos anteriores.
            $activo = $activos->random()->fresh();

            $destino = $ubicaciones
                ->where('id', '!=', $activo->ubicacion_actual_id)
                ->random();

            HistorialMovimiento::create([
                'activo_id'            => $activo->id,
                'usuario_registra_id'  => $registradores->random()->id,
                'ubicacion_origen_id'  => $activo->ubicacion_actual_id,
                'ubicacion_destino_id' => $destino->id,
                'tipo_movimiento'      => $this->tipos[array_rand($this->tipos)],
                'comentarios'          => fake()->optional(0.5)->sentence(),
            ]);

            // Actualiza la ubicación actual del activo para coherencia en iteraciones siguientes.
            $activo->update(['ubicacion_actual_id' => $destino->id]);
        }

        $this->command->info('12 movimientos históricos sembrados.');
    }
}
