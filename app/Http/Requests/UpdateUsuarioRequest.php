<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('maestros.gestionar');
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $id = $this->route('usuario')?->id;

        return [
            'name'            => ['required', 'string', 'max:255'],
            'nombre_completo' => ['required', 'string', 'max:255'],
            'email'           => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($id)],
            'password'        => ['nullable', 'string', 'min:8', 'confirmed'],
        ];
    }
}
