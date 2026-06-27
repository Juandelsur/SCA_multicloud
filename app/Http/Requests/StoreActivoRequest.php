<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\Activo::class);
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'numero_serie'        => ['required', 'string', 'max:255', 'unique:activos,numero_serie'],
            'marca'               => ['required', 'string', 'max:255'],
            'modelo'              => ['required', 'string', 'max:255'],
            'tipo_id'             => ['required', 'integer', 'exists:tipos_equipo,id'],
            'estado_id'           => ['required', 'integer', 'exists:estados_activo,id'],
            'ubicacion_actual_id' => ['required', 'integer', 'exists:ubicaciones,id'],
            'notas'               => ['nullable', 'string'],
            'foto'                => ['nullable', 'image', 'max:2048'],
        ];
    }
}
