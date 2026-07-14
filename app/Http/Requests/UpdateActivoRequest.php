<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateActivoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('activo'));
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $activoId = $this->route('activo')?->id;

        return [
            // codigo_inventario deliberadamente ausente: nunca se acepta desde este formulario,
            // aunque el cliente lo envíe, $request->safe() lo descarta por no estar en las reglas.
            'numero_serie'        => ['nullable', 'string', 'max:255', Rule::unique('activos', 'numero_serie')->ignore($activoId)],
            'marca'               => ['required', 'string', 'max:255'],
            'modelo'              => ['required', 'string', 'max:255'],
            'tipo_id'             => ['required', 'integer', 'exists:tipos_equipo,id'],
            'estado_id'           => ['required', 'integer', 'exists:estados_activo,id'],
            'ubicacion_actual_id' => ['required', 'integer', 'exists:ubicaciones,id'],
            'notas'               => ['nullable', 'string'],
            'foto'                => ['nullable', 'image', 'max:5120'],
            'eliminar_foto'       => ['nullable', 'boolean'],
        ];
    }
}
