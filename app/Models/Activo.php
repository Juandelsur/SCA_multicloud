<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

class Activo extends Model
{
    /** @use HasFactory<\Database\Factories\ActivoFactory> */
    use HasFactory;

    protected $table = 'activos';

    protected $fillable = [
        'codigo_inventario',
        'numero_serie',
        'marca',
        'modelo',
        'foto_path',
        'tipo_id',
        'estado_id',
        'ubicacion_actual_id',
        'notas',
    ];

    protected static function booted(): void
    {
        static::creating(function (Activo $activo): void {
            if (! empty($activo->codigo_inventario)) {
                return;
            }

            // Genera código INV-YY-XXXXXX (año 2 dígitos + 6 hex mayúscula) con manejo de colisiones.
            $intentos = 0;
            do {
                $candidato = 'INV-'.date('y').'-'.strtoupper(bin2hex(random_bytes(3)));
                $existe = static::where('codigo_inventario', $candidato)->exists();
                $intentos++;
            } while ($existe && $intentos < 100);

            if ($existe) {
                throw new RuntimeException('No se pudo generar un codigo_inventario único para Activo tras 100 intentos.');
            }

            $activo->codigo_inventario = $candidato;
        });
    }

    /** Tipo de equipo al que pertenece este activo. */
    public function tipo(): BelongsTo
    {
        return $this->belongsTo(TipoEquipo::class, 'tipo_id');
    }

    /** Estado operativo actual del activo. */
    public function estado(): BelongsTo
    {
        return $this->belongsTo(EstadoActivo::class, 'estado_id');
    }

    /** Ubicación donde se encuentra actualmente el activo. */
    public function ubicacionActual(): BelongsTo
    {
        return $this->belongsTo(Ubicacion::class, 'ubicacion_actual_id');
    }

    /** Historial completo de movimientos de este activo. */
    public function historialMovimientos(): HasMany
    {
        return $this->hasMany(HistorialMovimiento::class, 'activo_id');
    }

    /** URL firmada (SAS, 30 min) del blob Azure con la foto del activo, o null si no tiene foto. */
    public function fotoUrl(): ?string
    {
        if (! $this->foto_path) {
            return null;
        }

        return Storage::disk('azure')->temporaryUrl(
            $this->foto_path,
            now()->addMinutes(30)
        );
    }
}
