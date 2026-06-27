<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUbicacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'nombre_ubicacion' => ['required', 'string', 'max:255'],
            'departamento_id'  => ['required', 'integer', 'exists:departamentos,id'],
        ];
    }
}
