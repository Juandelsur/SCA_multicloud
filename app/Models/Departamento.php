<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Departamento extends Model
{
    protected $table = 'departamentos';

    protected $fillable = [
        'nombre_departamento',
    ];

    /** Ubicaciones que pertenecen a este departamento. */
    public function ubicaciones(): HasMany
    {
        return $this->hasMany(Ubicacion::class, 'departamento_id');
    }
}
