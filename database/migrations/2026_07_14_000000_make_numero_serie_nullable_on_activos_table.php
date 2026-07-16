<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Sin doctrine/dbal en el proyecto: ALTER COLUMN vía SQL crudo en vez de ->change().
        // Sintaxis válida solo en Postgres (pgsql real/CI). En sqlite (tests locales con
        // `php artisan test`, que usa phpunit.xml con DB_CONNECTION=sqlite :memory:) este
        // ALTER COLUMN no existe y tira un syntax error que aborta TODA la suite —
        // ActivoFactory ya rellena numero_serie siempre, así que no hace falta nada
        // equivalente ahí: alcanza con no ejecutar el ALTER en drivers que no sean pgsql.
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE activos ALTER COLUMN numero_serie DROP NOT NULL');
        }
    }

    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE activos ALTER COLUMN numero_serie SET NOT NULL');
        }
    }
};
