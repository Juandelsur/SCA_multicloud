#!/bin/sh
set -e

echo "=== SCA-IT Entrypoint ==="

# Verificar variables de entorno críticas
: "${APP_KEY:?ERROR: APP_KEY no está definida}"
: "${DB_HOST:?ERROR: DB_HOST no está definida}"
: "${DB_PASSWORD:?ERROR: DB_PASSWORD no está definida}"

# Limpiar y regenerar cachés de Laravel
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "=== Cachés de Laravel generadas ==="

# Crear directorio de logs si no existe
mkdir -p /var/log/supervisor
mkdir -p /var/log/nginx

echo "=== Iniciando servicios (php-fpm + nginx) ==="
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
