<?php

namespace App\Services;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Writer\PngWriter;
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

    /**
     * Genera el QR como data URI PNG (data:image/png;base64,...).
     * Usar en vistas Blade que se convierten a PDF con dompdf,
     * ya que dompdf tiene soporte SVG limitado pero PNG funciona de forma nativa.
     */
    public static function generarPngBase64(string $texto): string
    {
        return (new Builder(
            writer: new PngWriter(),
            data: $texto,
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::Medium,
            size: 200,
            margin: 4,
        ))->build()->getDataUri();
    }
}
