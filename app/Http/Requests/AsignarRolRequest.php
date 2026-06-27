<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AsignarRolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'rol' => ['required', 'string', 'in:Administrador,Técnico,Jefe'],
        ];
    }
}
