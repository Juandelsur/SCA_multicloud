#!/bin/bash
# =============================================================
# user_data.sh — Script de inicialización de las EC2
# Se ejecuta UNA VEZ al lanzar la instancia
# Instala Docker y corre el contenedor de la app Laravel
# =============================================================

set -e
exec > /var/log/user_data.log 2>&1

echo "=== Iniciando user_data.sh ==="

# Actualizar paquetes
apt-get update -y

# Instalar Docker
apt-get install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Habilitar y arrancar Docker
systemctl enable docker
systemctl start docker

echo "=== Docker instalado ==="

# Esperar a que Docker esté listo
sleep 5

# Correr el contenedor de la aplicación
docker run -d \
  --name sca-it \
  --restart unless-stopped \
  -p 8080:8080 \
  -e APP_ENV=production \
  -e APP_DEBUG=false \
  -e APP_KEY="${app_key}" \
  -e DB_CONNECTION=pgsql \
  -e DB_HOST="${db_host}" \
  -e DB_PORT=5432 \
  -e DB_DATABASE="${db_name}" \
  -e DB_USERNAME="${db_username}" \
  -e DB_PASSWORD="${db_password}" \
  -e SESSION_DRIVER=database \
  -e CACHE_STORE=database \
  -e FILESYSTEM_DISK=azure \
  -e AZURE_STORAGE_NAME="${azure_storage_name}" \
  -e AZURE_STORAGE_KEY="${azure_storage_key}" \
  -e AZURE_STORAGE_CONTAINER="${azure_storage_container}" \
  "${docker_image}"

echo "=== Contenedor iniciado ==="

# Esperar a que la app levante y correr migraciones
sleep 30
docker exec sca-it php artisan migrate --force
docker exec sca-it php artisan db:seed --force

echo "=== Migraciones y seeders ejecutados ==="
echo "=== user_data.sh completado ==="
