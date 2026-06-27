<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoEquipo extends Model
{
    protected $table = 'tipos_equipo';

    protected $fillable = [
        'nombre_tipo',
    ];

    /** Activos de este tipo. */
    public function activos(): HasMany
    {
        return $this->hasMany(Activo::class, 'tipo_id');
    }
}
