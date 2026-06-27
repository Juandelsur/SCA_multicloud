# =============================================================
# Stage 1: Build de assets React con Node
# =============================================================
FROM node:22-alpine AS node-build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# =============================================================
# Stage 2: Runtime PHP + Nginx
# =============================================================
FROM php:8.4-fpm-alpine AS production

# Instalar dependencias del sistema
RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-client \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    curl

# Instalar extensiones PHP
RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp && \
    docker-php-ext-install \
        pdo \
        pdo_pgsql \
        pgsql \
        gd \
        zip \
        bcmath \
        opcache \
        intl \
        mbstring \
        pcntl

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar código fuente
COPY . .

# Copiar assets compilados del stage de Node
COPY --from=node-build /app/public/build ./public/build

# Instalar dependencias PHP (sin dev)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts

# Permisos de Laravel
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Configuración de Nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Configuración de Supervisord
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# PHP-FPM config
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Opcache config
COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

# Script de entrada
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
