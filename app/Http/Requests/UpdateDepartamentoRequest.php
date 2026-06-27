<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDepartamentoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $id = $this->route('departamento')?->id;

        return [
            'nombre_departamento' => ['required', 'string', 'max:255', Rule::unique('departamentos', 'nombre_departamento')->ignore($id)],
        ];
    }
}
