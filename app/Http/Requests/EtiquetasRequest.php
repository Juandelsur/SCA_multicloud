<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EtiquetasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('etiquetas.generar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'activo_ids'      => ['nullable', 'array', 'min:1'],
            'activo_ids.*'    => ['integer', 'exists:activos,id'],
            'ubicacion_id'    => ['nullable', 'integer', 'exists:ubicaciones,id'],
            'departamento_id' => ['nullable', 'integer', 'exists:departamentos,id'],
        ];
    }
}
