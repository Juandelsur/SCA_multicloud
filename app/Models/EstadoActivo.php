<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EstadoActivo extends Model
{
    protected $table = 'estados_activo';

    protected $fillable = [
        'nombre_estado',
    ];

    /** Activos que tienen este estado. */
    public function activos(): HasMany
    {
        return $this->hasMany(Activo::class, 'estado_id');
    }
}
