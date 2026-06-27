<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historial_movimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activo_id')->constrained('activos')->restrictOnDelete();
            $table->foreignId('usuario_registra_id')->constrained('users')->restrictOnDelete();
            $table->foreignId('ubicacion_origen_id')->constrained('ubicaciones')->restrictOnDelete();
            $table->foreignId('ubicacion_destino_id')->constrained('ubicaciones')->restrictOnDelete();
            $table->string('tipo_movimiento')->default('TRASLADO');
            $table->text('comentarios')->nullable();
            $table->timestamps();

            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_movimientos');
    }
};
