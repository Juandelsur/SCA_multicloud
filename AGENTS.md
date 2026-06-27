<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4
- inertiajs/inertia-laravel (INERTIA_LARAVEL) - v3
- laravel/fortify (FORTIFY) - v1
- laravel/framework (LARAVEL) - v13
- laravel/prompts (PROMPTS) - v0
- laravel/wayfinder (WAYFINDER) - v0
- larastan/larastan (LARASTAN) - v3
- laravel/boost (BOOST) - v2
- laravel/mcp (MCP) - v0
- laravel/pail (PAIL) - v1
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- pestphp/pest (PEST) - v4
- phpunit/phpunit (PHPUNIT) - v12
- @inertiajs/react (INERTIA_REACT) - v3
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER_VITE) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available in `**/skills/**`. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

## Tools

- Laravel Boost is an MCP server with tools designed specifically for this application. Prefer Boost tools over manual alternatives like shell commands or file reads.
- Use `database-query` to run read-only queries against the database instead of writing raw SQL in tinker.
- Use `database-schema` to inspect table structure before writing migrations or models.
- Use `get-absolute-url` to resolve the correct scheme, domain, and port for project URLs. Always use this before sharing a URL with the user.
- Use `browser-logs` to read browser logs, errors, and exceptions. Only recent logs are useful, ignore old entries.

## Searching Documentation (IMPORTANT)

- Always use `search-docs` before making code changes. Do not skip this step. It returns version-specific docs based on installed packages automatically.
- Pass a `packages` array to scope results when you know which packages are relevant.
- Use multiple broad, topic-based queries: `['rate limiting', 'routing rate limiting', 'routing']`. Expect the most relevant results first.
- Do not add package names to queries because package info is already shared. Use `test resource table`, not `filament 4 test resource table`.

### Search Syntax

1. Use words for auto-stemmed AND logic: `rate limit` matches both "rate" AND "limit".
2. Use `"quoted phrases"` for exact position matching: `"infinite scroll"` requires adjacent words in order.
3. Combine words and phrases for mixed queries: `middleware "rate limit"`.
4. Use multiple queries for OR logic: `queries=["authentication", "middleware"]`.

## Artisan

- Run Artisan commands directly via the command line (e.g., `php artisan route:list`). Use `php artisan list` to discover available commands and `php artisan [command] --help` to check parameters.
- Inspect routes with `php artisan route:list`. Filter with: `--method=GET`, `--name=users`, `--path=api`, `--except-vendor`, `--only-vendor`.
- Read configuration values using dot notation: `php artisan config:show app.name`, `php artisan config:show database.default`. Or read config files directly from the `config/` directory.

## Tinker

- Execute PHP in app context for debugging and testing code. Do not create models without user approval, prefer tests with factories instead. Prefer existing Artisan commands over custom tinker code.
- Always use single quotes to prevent shell expansion: `php artisan tinker --execute 'Your::code();'`
  - Double quotes for PHP strings inside: `php artisan tinker --execute 'User::where("active", true)->count();'`

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.
- Use PHP 8 constructor property promotion: `public function __construct(public GitHub $github) { }`. Do not leave empty zero-parameter `__construct()` methods unless the constructor is private.
- Use explicit return type declarations and type hints for all method parameters: `function isAccessible(User $user, ?string $path = null): bool`
- Use TitleCase for Enum keys: `FavoritePerson`, `BestLake`, `Monthly`.
- Prefer PHPDoc blocks over inline comments. Only add inline comments for exceptionally complex logic.
- Use array shape type definitions in PHPDoc blocks.

=== deployments rules ===

# Deployment

- Laravel can be deployed using [Laravel Cloud](https://cloud.laravel.com/), which is the fastest way to deploy and scale production Laravel applications.

=== herd rules ===

# Laravel Herd

- The application is served by Laravel Herd at `https?://[kebab-case-project-dir].test`. Use the `get-absolute-url` tool to generate valid URLs. Never run commands to serve the site. It is always available.
- Use the `herd` CLI to manage services, PHP versions, and sites (e.g. `herd sites`, `herd services:start <service>`, `herd php:list`). Run `herd list` to discover all available commands.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-react-development` when working with Inertia client-side patterns.

# Inertia v3

- Use all Inertia features from v1, v2, and v3. Check the documentation before making changes to ensure the correct approach.
- New v3 features: standalone HTTP requests (`useHttp` hook), optimistic updates with automatic rollback, layout props (`useLayoutProps` hook), instant visits, simplified SSR via `@inertiajs/vite` plugin, custom exception handling for error pages.
- Carried over from v2: deferred props, infinite scroll, merging props, polling, prefetching, once props, flash data.
- When using deferred props, add an empty state with a pulsing or animated skeleton.
- Axios has been removed. Use the built-in XHR client with interceptors, or install Axios separately if needed.
- `Inertia::lazy()` / `LazyProp` has been removed. Use `Inertia::optional()` instead.
- Prop types (`Inertia::optional()`, `Inertia::defer()`, `Inertia::merge()`) work inside nested arrays with dot-notation paths.
- SSR works automatically in Vite dev mode with `@inertiajs/vite` - no separate Node.js server needed during development.
- Event renames: `invalid` is now `httpException`, `exception` is now `networkError`.
- `router.cancel()` replaced by `router.cancelAll()`.
- The `future` configuration namespace has been removed - all v2 future options are now always enabled.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using `php artisan list` and check their parameters with `php artisan [command] --help`.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `php artisan make:model --help` to check the available options.

## APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.

=== wayfinder/core rules ===

# Laravel Wayfinder

Use Wayfinder to generate TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

=== pint/core rules ===

# Laravel Pint Code Formatter

- If you have modified any PHP files, you must run `vendor/bin/pint --dirty --format agent` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test --format agent`, simply run `vendor/bin/pint --format agent` to fix any formatting issues.

=== pest/core rules ===

## Pest

- This project uses Pest for testing. Create tests: `php artisan make:test --pest {name}`.
- The `{name}` argument should not include the test suite directory. Use `php artisan make:test --pest SomeFeatureTest` instead of `php artisan make:test --pest Feature/SomeFeatureTest`.
- Run tests: `php artisan test --compact` or filter: `php artisan test --compact --filter=testName`.
- Do NOT delete tests without approval.

=== inertia-react/core rules ===

# Inertia + React

- IMPORTANT: Activate `inertia-react-development` when working with Inertia React client-side patterns.

</laravel-boost-guidelines>

---

# ============================================================
# CONTEXTO DEL PROYECTO — SCA-IT (PoC Multicloud)
# (Reglas de negocio del proyecto. Las guidelines de Laravel Boost
#  de arriba mandan en lo técnico; esta sección define QUÉ construir.)
# ============================================================

## Alcance actual: SOLO BACKEND
Dejar el backend completo, migrado, sembrado y funcionando en local: base de datos, modelos, lógica de negocio, roles, controladores, generación de QR y PDF de etiquetas. El FRONTEND (3 UX distintas, una por rol) se aborda después. La INFRAESTRUCTURA (Terraform, Docker prod, CI/CD) también se aborda después.

## 1. Qué es SCA-IT
Sistema de Control de Activos Informáticos para un hospital. Registra activos (computadores, impresoras, equipos médicos), les asigna ubicación, los **mueve entre ubicaciones con trazabilidad completa**, adjunta **una foto del activo**, **genera códigos QR** e **imprime etiquetas QR** de activos en PDF.

Es la migración de un proyecto previo Django + Vue → Laravel + React monolítico (Inertia). El esquema de DB del proyecto viejo se reutiliza casi 1:1 (sección 4).

Es una PoC para el ramo Arquitectura Multicloud; lo evaluado es la infraestructura, pero el backend debe quedar funcional. Usuario principal: el **técnico de soporte**, en movimiento con su teléfono; el flujo crítico es la **movilización de activos**.

## 2. Stack ya instalado (NO reinstalar lo que ya está)
El starter kit ya trae: Laravel 13, PHP 8.4, Inertia v3, React 19, Fortify v1 (auth), Pest v4, Tailwind 4, Wayfinder. La base de datos local es **PostgreSQL en Docker** (puerto 5432), ya conectada vía `.env`.

Paquetes a AGREGAR (pedir aprobación antes, según reglas de Boost):
- `spatie/laravel-permission` — roles y permisos.
- `simplesoftwareio/simple-qrcode` — generar imagen QR desde texto.
- `barryvdh/laravel-dompdf` — PDF de etiquetas al vuelo.
- `league/flysystem-azure-blob-storage` (^3.0) — disco Azure para fotos.

## 3. Autenticación (YA RESUELTA por Fortify)
La auth es por **sesión web (cookies)**, gestionada por **Fortify** — NO JWT, NO Sanctum manual. El kit ya tiene login/registro/sesión funcionando. En backend solo hay que **proteger rutas** con middleware `auth` + middleware de rol/permiso de spatie.

Justificación para el informe (seguridad): sesión con cookie HttpOnly + CSRF de Laravel mitiga robo por XSS (problema de guardar JWT en localStorage) y permite invalidación inmediata de sesión. Es el enfoque recomendado para apps monolíticas del mismo origen. El proyecto viejo usaba JWT porque tenía API y SPA separadas; al consolidar en monolítico, sesión es más seguro y simple.

## 4. Esquema de base de datos (traducido de Django)
9 entidades de dominio + tablas de spatie. Nombres de tablas y columnas en **español**. FK con `restrict` en borrado (equivale al PROTECT de Django) salvo donde se indique. spatie crea sus propias tablas al publicar migraciones; NO crear tabla manual de roles.

### users (extiende el default)
- Default de Laravel + campo extra `nombre_completo` (string). Trait `HasRoles` de spatie. Rol asignado vía `assignRole`, no FK manual.

### departamentos
- `nombre_departamento` (string, unique). Ej: Urgencias, Pabellón, UCI.

### ubicaciones
- `nombre_ubicacion` (string)
- `codigo_qr` (string, unique, autogenerado, indexado) — formato `LOC-XXXXXX` (6 hex mayúscula)
- `departamento_id` (FK → departamentos, restrict)
- unique compuesto (`nombre_ubicacion`, `departamento_id`)

### tipos_equipo
- `nombre_tipo` (string, unique). Ej: Monitor, Computador, Impresora.

### estados_activo
- `nombre_estado` (string, unique). Ej: Operativo, En Mantención, En Reparación, De Baja.

### activos (tabla central)
- `codigo_inventario` (string, unique, autogenerado, indexado) — formato `INV-YY-XXXXXX` (año 2 dígitos + 6 hex mayúscula)
- `numero_serie` (string, unique, indexado)
- `marca` (string), `modelo` (string)
- `foto_path` (string, nullable) — ruta del blob en Azure (la foto NO se guarda en DB, solo su ruta)
- `tipo_id` (FK → tipos_equipo, restrict)
- `estado_id` (FK → estados_activo, restrict)
- `ubicacion_actual_id` (FK → ubicaciones, restrict)
- `notas` (text, nullable)
- timestamps (created_at = "fecha_alta")

### historial_movimientos (trazabilidad)
- `activo_id` (FK → activos, restrict)
- `usuario_registra_id` (FK → users, restrict)
- `ubicacion_origen_id` (FK → ubicaciones, restrict)
- `ubicacion_destino_id` (FK → ubicaciones, restrict)
- `tipo_movimiento` (string): TRASLADO|ASIGNACION|DEVOLUCION|MANTENIMIENTO|RETORNO|BAJA (default TRASLADO)
- `comentarios` (text, nullable)
- timestamps (created_at = fecha del movimiento, indexado)

### auditoria_logs
- `usuario_id` (FK → users, nullOnDelete — el log sobrevive si se borra el usuario)
- `accion` (string, indexado): CREATE|UPDATE|DELETE|LOGIN|LOGOUT|EXPORT|IMPORT|VIEW|OTHER
- `detalle_accion` (jsonb; cast a array en el modelo)
- timestamps (created_at = timestamp del evento, indexado)

## 5. Modelos y relaciones
Un modelo por entidad, `$fillable` explícito, relaciones explícitas, cast `detalle_accion` → array, código y comentarios en español.

Relaciones: Departamento hasMany Ubicacion; Ubicacion belongsTo Departamento + hasMany Activo (ubicacion_actual); TipoEquipo/EstadoActivo hasMany Activo; Activo belongsTo TipoEquipo/EstadoActivo/Ubicacion + hasMany HistorialMovimiento; HistorialMovimiento belongsTo Activo/User(registra)/Ubicacion(origen)/Ubicacion(destino); AuditoriaLog belongsTo User; User HasRoles + hasMany HistorialMovimiento/AuditoriaLog.

### 5.1 Generación de códigos únicos con manejo de colisiones
En Ubicacion y Activo, evento `creating` (en `booted()`): si el código viene vacío, generar candidato
- Ubicación: `'LOC-' . strtoupper(bin2hex(random_bytes(3)))`
- Activo: `'INV-' . date('y') . '-' . strtoupper(bin2hex(random_bytes(3)))`
verificar unicidad, reintentar (máx 100), si se agota lanzar excepción.

## 6. Lógica de negocio
### 6.1 Movilización de activo (transaccional) — ACCIÓN CLAVE
Acción `movilizar` sobre un activo. Recibe `ubicacion_destino_id`, `tipo_movimiento` (opc, default TRASLADO), `comentarios` (opc). Dentro de `DB::transaction()`:
1. Capturar origen = ubicacion_actual.
2. Validar destino existe y ≠ origen.
3. Actualizar `ubicacion_actual_id` → destino.
4. Insertar en historial_movimientos (activo, usuario autenticado, origen, destino, tipo, comentarios).
5. Insertar en auditoria_logs (detalle JSON).
Todo o nada. Solo Admin y Técnico pueden movilizar.

NOTA QR: el sistema GENERA QR e imprime etiquetas, pero el ESCANEO POR CÁMARA queda FUERA DE ALCANCE (la cámara del navegador exige HTTPS, no disponible en AWS Academy). En la movilización el activo y destino se eligen ingresando el código o seleccionando de un listado, no escaneando.

### 6.2 RBAC (spatie) — 3 roles: Administrador, Técnico, Jefe
| Recurso/acción | Admin | Técnico | Jefe |
|---|---|---|---|
| Maestros (deptos, ubicaciones, tipos, estados, usuarios) CRUD | sí | no | no |
| Activos: ver | sí | sí | sí |
| Activos: crear/editar | sí | sí | no |
| Activos: eliminar | sí | no | no |
| Movilizar activo | sí | sí | no |
| Historial: ver | sí | sí | sí |
| Auditoría: ver | sí | no | sí |
| Etiquetas QR: generar/imprimir | sí | sí | ver |

Permisos granulares de spatie (ej: `activos.crear`, `activos.editar`, `activos.eliminar`, `activos.movilizar`, `maestros.gestionar`, `historial.ver`, `auditoria.ver`). Asignar permisos a roles en seeder. Proteger rutas con middleware `permission:...`; registrar alias `role`/`permission`/`role_or_permission` en **bootstrap/app.php** (Laravel 11+, no Kernel.php). Usar Policies para reglas finas.

### 6.3 Auditoría
Helper estático en AuditoriaLog (ej. `AuditoriaLog::registrar($usuario, $accion, $detalle=[])`) para acciones clave (crear/editar/eliminar activo, movilizar, login/logout).

## 7. QR e impresión (backend) — generar e imprimir, SIN escaneo
- **Generar QR:** simple-qrcode, a partir del texto del código (codigo_inventario / codigo_qr). Exponer como imagen embebible (SVG/PNG).
- **PDF etiquetas de ACTIVOS:** dompdf. Cada etiqueta = QR del activo + datos (marca, modelo, n° serie, código inventario, ubicación actual). Generado al vuelo, NO almacenado. Selección flexible: por activos seleccionados, por ubicación, o por departamento. Vista Blade con grilla → DOMPDF → descarga.

## 8. Controladores, rutas, validación
Controladores resource para: ActivoController (+ acción `movilizar` + acción `etiquetas` PDF), UbicacionController, DepartamentoController, TipoEquipoController, EstadoActivoController (CRUD solo Admin), UsuarioController (CRUD + asignar rol, solo Admin), HistorialController (lectura), AuditoriaController (lectura, Admin y Jefe).
- Validación con **FormRequests** (no inline).
- Cada ruta protegida con su middleware de permiso.
- Eager loading para evitar N+1 (ej. `Activo::with(['tipo','estado','ubicacionActual.departamento'])`).
- Seguir convención de API Resources del kit si aplica.

## 9. Datos de prueba (Factories + Seeders, Faker)
DatabaseSeeder en orden de dependencias:
1. RolesPermisosSeeder (fijo): 3 roles + permisos, asignación. Limpiar caché de permisos al inicio.
2. MaestrosSeeder (fijo): estados (4), tipos (4-5), departamentos (2-3), ubicaciones (4-6).
3. UsuariosSeeder (fijo): admin@sca.cl / tecnico@sca.cl / jefe@sca.cl, todos password `password`, con su rol.
4. ActivosSeeder (Faker): ~20-30 activos.
5. MovimientosSeeder (Faker): ~10-15 movimientos (origen ≠ destino, coherentes).
Objetivo: `php artisan migrate:fresh --seed` deja la base lista.

## 10. Orden de ejecución (pasos backend)
0. (HECHO) Proyecto creado en ~/Herd/sca-it, Postgres en Docker, .env conectado, migraciones default OK.
1. Instalar paquetes de sección 2 (pedir aprobación). Publicar migraciones de spatie. Trait HasRoles en User. Alias middleware en bootstrap/app.php. Configurar disco `azure` en config/filesystems.php (credenciales por .env: AZURE_STORAGE_NAME, AZURE_STORAGE_KEY, AZURE_STORAGE_CONTAINER).
2. Migraciones de las 9 entidades (orden de dependencias) — vía `php artisan make:migration`.
3. Modelos con relaciones, casts, fillable, generación de códigos — vía `php artisan make:model`.
4. RBAC: permisos + roles en seeder; middleware en rutas; Policies.
5. Factories + Seeders (sección 9). `php artisan migrate:fresh --seed`. Verificar con Boost `database-query` o tests Pest.
6. Controladores + rutas + FormRequests (sección 8). Tests Pest.
7. QR + PDF etiquetas (sección 7).
8. Integración Azure Blob: subir foto al disco azure, guardar ruta en foto_path, leer desde Azure.

## 11. Convenciones del proyecto (además de las de Boost)
- Código y comentarios en ESPAÑOL (trabajo académico chileno). Nombres de tablas/columnas en español.
- NUNCA hardcodear credenciales — todo por .env (DB, Azure).
- Transacciones obligatorias donde se tocan varias tablas (movilización).
- Preferir soluciones simples y demostrables (PoC académica sobre AWS Academy), no enterprise.

## 12. Fuera de alcance ahora (después)
- Frontend / 3 UX por rol (Técnico mobile-first, Admin dashboard, Jefe solo-lectura).
- Infraestructura: Terraform (AWS EC2 x2 + ALB + RDS + Azure Blob), Docker prod, CI/CD GitHub Actions + Trivy, demo HA.
- Escaneo QR por cámara (descartado por HTTPS en AWS Academy).
- Pendientes futuros (Nota 4): Redis sesiones compartidas, varias fotos por activo (tabla fotos_activo), Data Warehouse / analítica, vista de ubicación con conteo.
