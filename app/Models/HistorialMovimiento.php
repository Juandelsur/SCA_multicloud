<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistorialMovimiento extends Model
{
    protected $table = 'historial_movimientos';

    protected $fillable = [
        'activo_id',
        'usuario_registra_id',
        'ubicacion_origen_id',
        'ubicacion_destino_id',
        'tipo_movimiento',
        'comentarios',
    ];

    /** Activo que fue movido. */
    public function activo(): BelongsTo
    {
        return $this->belongsTo(Activo::class, 'activo_id');
    }

    /** Usuario que registró el movimiento. */
    public function usuarioRegistra(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usuario_registra_id');
    }

    /** Ubicación desde donde se originó el movimiento. */
    public function ubicacionOrigen(): BelongsTo
    {
        return $this->belongsTo(Ubicacion::class, 'ubicacion_origen_id');
    }

    /** Ubicación de destino del movimiento. */
    public function ubicacionDestino(): BelongsTo
    {
        return $this->belongsTo(Ubicacion::class, 'ubicacion_destino_id');
    }
}
