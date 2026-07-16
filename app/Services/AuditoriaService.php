<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class AuditoriaService
{
    /**
     * Notifica un evento a servicio-auditoria. Best-effort: si el servicio está
     * caído, lento o responde con error, esto NUNCA debe romper ni revertir la
     * acción principal (mover/crear/editar/eliminar un activo) — solo se loguea
     * un warning y se continúa.
     */
    public function registrarEvento(int $activoId, string $usuario, string $accion, string $detalle): void
    {
        $url = config('services.auditoria.url');

        if (! $url) {
            return;
        }

        try {
            Http::timeout(3)->post("{$url}/eventos", [
                'activo_id' => $activoId,
                'usuario'   => $usuario,
                'accion'    => $accion,
                'detalle'   => $detalle,
            ])->throw();
        } catch (Throwable $e) {
            Log::warning('No se pudo registrar el evento en servicio-auditoria', [
                'activo_id' => $activoId,
                'accion'    => $accion,
                'error'     => $e->getMessage(),
            ]);
        }
    }
}
