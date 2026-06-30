<?php

namespace Database\Factories;

use App\Models\Activo;
use App\Models\EstadoActivo;
use App\Models\TipoEquipo;
use App\Models\Ubicacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Activo>
 */
class ActivoFactory extends Factory
{
    /** @var array<string> */
    private static array $marcas = ['Dell', 'HP', 'Lenovo', 'Apple', 'Samsung', 'Epson', 'Brother', 'Cisco', 'Acer', 'Asus'];

    /** @var array<string> */
    private static array $modelos = ['ProBook 450', 'ThinkPad X1', 'Inspiron 15', 'MacBook Pro', 'Galaxy Tab', 'WorkForce WF-3720', 'HL-L2350DW', 'Catalyst 2960', 'Aspire 5', 'VivoBook 15'];

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // codigo_inventario se autogenera en el evento creating del modelo
            'numero_serie' => strtoupper(fake()->bothify('??###??###')),
            'marca' => fake()->randomElement(self::$marcas),
            'modelo' => fake()->randomElement(self::$modelos),
            'foto_path' => null,
            'tipo_id' => TipoEquipo::inRandomOrder()->value('id'),
            'estado_id' => EstadoActivo::inRandomOrder()->value('id'),
            'ubicacion_actual_id' => Ubicacion::inRandomOrder()->value('id'),
            'notas' => fake()->optional(0.3)->sentence(),
        ];
    }
}
