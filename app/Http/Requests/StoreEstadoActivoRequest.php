<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEstadoActivoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'nombre_estado' => ['required', 'string', 'max:255', 'unique:estados_activo,nombre_estado'],
        ];
    }
}
