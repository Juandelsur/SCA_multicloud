<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTipoEquipoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $id = $this->route('tipos_equipo')?->id ?? $this->route('tipo_equipo')?->id;

        return [
            'nombre_tipo' => ['required', 'string', 'max:255', Rule::unique('tipos_equipo', 'nombre_tipo')->ignore($id)],
        ];
    }
}
