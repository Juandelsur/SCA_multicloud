<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use RuntimeException;

class Ubicacion extends Model
{
    protected $table = 'ubicaciones';

    protected $fillable = [
        'nombre_ubicacion',
        'codigo_qr',
        'departamento_id',
    ];

    protected static function booted(): void
    {
        static::creating(function (Ubicacion $ubicacion): void {
            if (! empty($ubicacion->codigo_qr)) {
                return;
            }

            // Genera código LOC-XXXXXX (6 hex mayúscula) con manejo de colisiones.
            $intentos = 0;
            do {
                $candidato = 'LOC-'.strtoupper(bin2hex(random_bytes(3)));
                $existe = static::where('codigo_qr', $candidato)->exists();
                $intentos++;
            } while ($existe && $intentos < 100);

            if ($existe) {
                throw new RuntimeException('No se pudo generar un codigo_qr único para Ubicacion tras 100 intentos.');
            }

            $ubicacion->codigo_qr = $candidato;
        });
    }

    /** Departamento al que pertenece esta ubicación. */
    public function departamento(): BelongsTo
    {
        return $this->belongsTo(Departamento::class, 'departamento_id');
    }

    /** Activos cuya ubicación actual es esta. */
    public function activos(): HasMany
    {
        return $this->hasMany(Activo::class, 'ubicacion_actual_id');
    }

    /** Movimientos que tuvieron esta ubicación como origen. */
    public function movimientosOrigen(): HasMany
    {
        return $this->hasMany(HistorialMovimiento::class, 'ubicacion_origen_id');
    }

    /** Movimientos que tuvieron esta ubicación como destino. */
    public function movimientosDestino(): HasMany
    {
        return $this->hasMany(HistorialMovimiento::class, 'ubicacion_destino_id');
    }
}
