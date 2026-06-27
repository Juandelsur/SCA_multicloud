<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUbicacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $id      = $this->route('ubicacion')?->id;
        $deptoId = (int) $this->input('departamento_id');

        return [
            'nombre_ubicacion' => ['required', 'string', 'max:255', Rule::unique('ubicaciones')->where('departamento_id', $deptoId)->ignore($id)],
            'departamento_id'  => ['required', 'integer', 'exists:departamentos,id'],
        ];
    }
}
