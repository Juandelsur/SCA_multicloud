<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
        $user = Auth::user();

        if ($user->hasRole('Técnico')) {
            return redirect()->route('tecnico.home');
        }

        if ($user->hasRole('Administrador')) {
            return redirect()->route('dashboard');
        }

        if ($user->hasRole('Jefe')) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('dashboard');
    }
}
