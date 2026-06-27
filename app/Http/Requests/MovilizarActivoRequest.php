<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovilizarActivoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('movilizar', $this->route('activo'));
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'ubicacion_destino_id' => ['required', 'integer', 'exists:ubicaciones,id'],
            'tipo_movimiento'      => ['nullable', 'string', 'in:TRASLADO,ASIGNACION,DEVOLUCION,MANTENIMIENTO,RETORNO,BAJA'],
            'comentarios'          => ['nullable', 'string', 'max:1000'],
        ];
    }
}
