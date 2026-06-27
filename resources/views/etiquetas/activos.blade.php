<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Etiquetas de Activos</title>
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 8pt;
        color: #1a1a1a;
        background: #fff;
    }

    /* Tabla principal: 3 etiquetas por fila */
    .grilla {
        width: 100%;
        border-collapse: collapse;
    }

    .grilla td {
        width: 33.33%;
        padding: 4pt;
        vertical-align: top;
    }

    /* Cada etiqueta es un recuadro compacto */
    .etiqueta {
        border: 1pt solid #555;
        border-radius: 3pt;
        padding: 6pt;
        text-align: center;
        page-break-inside: avoid;
        background: #fff;
    }

    .etiqueta img.qr {
        width: 80pt;
        height: 80pt;
        display: block;
        margin: 0 auto 4pt auto;
    }

    .etiqueta .codigo {
        font-size: 7pt;
        font-weight: bold;
        letter-spacing: 0.5pt;
        color: #111;
        margin-bottom: 2pt;
        word-break: break-all;
    }

    .etiqueta .separador {
        border-top: 0.5pt solid #ccc;
        margin: 3pt 0;
    }

    .etiqueta .campo {
        font-size: 7pt;
        color: #333;
        margin-bottom: 1pt;
        text-align: left;
    }

    .etiqueta .campo span.label {
        font-weight: bold;
        color: #555;
    }

    .etiqueta .ubicacion {
        font-size: 6.5pt;
        margin-top: 3pt;
        padding: 2pt 4pt;
        background: #f0f0f0;
        border-radius: 2pt;
        text-align: center;
        word-break: break-word;
    }

    /* Celda vacía cuando el número de activos no es múltiplo de 3 */
    .celda-vacia {
        width: 33.33%;
        padding: 4pt;
    }

    /* Pie de página */
    .pie {
        margin-top: 8pt;
        font-size: 6pt;
        color: #999;
        text-align: right;
    }
</style>
</head>
<body>

{{-- Encabezado --}}
<table style="width:100%; margin-bottom:6pt;">
    <tr>
        <td style="font-size:10pt; font-weight:bold;">Etiquetas de Activos — SCA-IT</td>
        <td style="text-align:right; font-size:7pt; color:#666;">
            Generado el {{ now()->format('d/m/Y H:i') }}
        </td>
    </tr>
</table>

<table class="grilla">
@php $columnas = 3; $col = 0; @endphp

@foreach ($etiquetas as $item)
    @if ($col === 0)
    <tr>
    @endif

    <td>
        <div class="etiqueta">

            {{-- Código QR como PNG base64 --}}
            <img class="qr" src="{{ $item['qr_png'] }}" alt="QR {{ $item['codigo_inventario'] }}">

            {{-- Código de inventario destacado --}}
            <div class="codigo">{{ $item['codigo_inventario'] }}</div>

            <div class="separador"></div>

            {{-- Datos del activo --}}
            <div class="campo">
                <span class="label">Marca/Modelo:</span>
                {{ $item['marca'] }} {{ $item['modelo'] }}
            </div>
            <div class="campo">
                <span class="label">N° Serie:</span>
                {{ $item['numero_serie'] }}
            </div>

            {{-- Ubicación actual --}}
            <div class="ubicacion">
                📍 {{ $item['ubicacion'] }}<br>
                <span style="color:#888;">{{ $item['departamento'] }}</span>
            </div>

        </div>
    </td>

    @php $col++; @endphp

    @if ($col === $columnas)
    </tr>
    @php $col = 0; @endphp
    @endif

@endforeach

{{-- Rellena con celdas vacías si la última fila queda incompleta --}}
@if ($col > 0)
    @for ($i = $col; $i < $columnas; $i++)
    <td class="celda-vacia"></td>
    @endfor
    </tr>
@endif

</table>

<div class="pie">
    Total de etiquetas: {{ count($etiquetas) }} | Sistema de Control de Activos Informáticos
</div>

</body>
</html>
