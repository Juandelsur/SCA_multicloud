<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTipoEquipoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'nombre_tipo' => ['required', 'string', 'max:255', 'unique:tipos_equipo,nombre_tipo'],
        ];
    }
}
