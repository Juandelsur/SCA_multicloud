<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ubicaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_ubicacion');
            $table->string('codigo_qr')->nullable()->unique()->index();
            $table->foreignId('departamento_id')->constrained('departamentos')->restrictOnDelete();
            $table->unique(['nombre_ubicacion', 'departamento_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ubicaciones');
    }
};
