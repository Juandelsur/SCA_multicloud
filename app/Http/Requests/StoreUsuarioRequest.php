<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name'            => ['required', 'string', 'max:255'],
            'nombre_completo' => ['required', 'string', 'max:255'],
            'email'           => ['required', 'email', 'max:255', 'unique:users,email'],
            'password'        => ['required', 'string', 'min:8', 'confirmed'],
            'rol'             => ['required', 'string', 'in:Administrador,Técnico,Jefe'],
        ];
    }
}
