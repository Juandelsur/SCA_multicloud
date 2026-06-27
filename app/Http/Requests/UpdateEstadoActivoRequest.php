<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEstadoActivoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $id = $this->route('estados_activo')?->id ?? $this->route('estado_activo')?->id;

        return [
            'nombre_estado' => ['required', 'string', 'max:255', Rule::unique('estados_activo', 'nombre_estado')->ignore($id)],
        ];
    }
}
