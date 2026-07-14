<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Sin doctrine/dbal en el proyecto: ALTER COLUMN vía SQL crudo en vez de ->change().
        DB::statement('ALTER TABLE activos ALTER COLUMN numero_serie DROP NOT NULL');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE activos ALTER COLUMN numero_serie SET NOT NULL');
    }
};
