<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_inventario')->nullable()->unique()->index();
            $table->string('numero_serie')->unique()->index();
            $table->string('marca');
            $table->string('modelo');
            $table->string('foto_path')->nullable();
            $table->foreignId('tipo_id')->constrained('tipos_equipo')->restrictOnDelete();
            $table->foreignId('estado_id')->constrained('estados_activo')->restrictOnDelete();
            $table->foreignId('ubicacion_actual_id')->constrained('ubicaciones')->restrictOnDelete();
            $table->text('notas')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activos');
    }
};
