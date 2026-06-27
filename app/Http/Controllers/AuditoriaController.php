<?php

namespace App\Http\Controllers;

use App\Models\AuditoriaLog;
use Inertia\Inertia;
use Inertia\Response;

class AuditoriaController extends Controller
{
    public function index(): Response
    {
        $logs = AuditoriaLog::with('usuario')
            ->latest()
            ->paginate(50);

        return Inertia::render('Auditoria/Index', ['logs' => $logs]);
    }

    public function show(AuditoriaLog $auditoriaLog): Response
    {
        $auditoriaLog->load('usuario');

        return Inertia::render('Auditoria/Show', ['log' => $auditoriaLog]);
    }
}
