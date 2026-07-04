<?php

namespace App\Console\Commands;

use App\Models\Activo;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class AsignarFotosActivos extends Command
{
    protected $signature = 'activos:asignar-fotos {--dry-run : Solo muestra el cruce sin guardar cambios}';

    protected $description = 'Asigna secuencialmente los blobs del contenedor azure "activos" a los registros de Activo (ordenados por id) que aún no tienen foto_path';

    public function handle(): int
    {
        $fotos = Storage::disk('azure')->files();
        sort($fotos, SORT_NATURAL);

        $activos = Activo::orderBy('id')->get();

        if ($fotos === []) {
            $this->error('No se encontraron blobs en el disco "azure". Verifica AZURE_STORAGE_NAME/KEY/CONTAINER.');

            return self::FAILURE;
        }

        if ($activos->isEmpty()) {
            $this->error('No hay registros de Activo en la base de datos.');

            return self::FAILURE;
        }

        $total = min($activos->count(), count($fotos));

        if ($activos->count() !== count($fotos)) {
            $this->warn("Aviso: {$activos->count()} activos vs ".count($fotos)." fotos. Se asignarán {$total} pares.");
        }

        $dryRun = (bool) $this->option('dry-run');

        $this->table(
            ['Activo ID', 'Código', 'foto_path asignado'],
            collect(range(0, $total - 1))->map(function (int $i) use ($activos, $fotos, $dryRun) {
                $activo = $activos[$i];

                if (! $dryRun) {
                    $activo->update(['foto_path' => $fotos[$i]]);
                }

                return [$activo->id, $activo->codigo_inventario, $fotos[$i]];
            })
        );

        $this->info($dryRun
            ? "Dry-run: {$total} activos serían actualizados (sin cambios guardados)."
            : "{$total} activos actualizados con su foto_path.");

        return self::SUCCESS;
    }
}
