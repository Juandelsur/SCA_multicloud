<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditoriaLog extends Model
{
    protected $table = 'auditoria_logs';

    protected $fillable = [
        'usuario_id',
        'accion',
        'detalle_accion',
    ];

    protected $casts = [
        'detalle_accion' => 'array',
    ];

    /**
     * Registra una entrada de auditoría de forma estática.
     *
     * @param  array<string, mixed>  $detalle
     */
    public static function registrar(?User $usuario, string $accion, array $detalle = []): self
    {
        return static::create([
            'usuario_id' => $usuario?->id,
            'accion' => $accion,
            'detalle_accion' => $detalle,
        ]);
    }

    /** Usuario que ejecutó la acción auditada (puede ser null si el usuario fue eliminado). */
    public function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
