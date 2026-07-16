<?php

namespace App\Services;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Writer\SvgWriter;

class QrService
{
    /**
     * Genera el QR como cadena SVG embebible directamente en HTML.
     * Usar en endpoints JSON o en vistas web (no PDF).
     */
    public static function generarSvg(string $texto): string
    {
        // v6: Builder es readonly, se instancia con named args y se llama build().
        return (new Builder(
            writer: new SvgWriter(),
            data: $texto,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::Medium,
            size: 200,
            margin: 4,
        ))->build()->getString();
    }
}
