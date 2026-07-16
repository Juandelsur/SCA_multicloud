-- Crea (o actualiza la contraseña de) un usuario de Postgres de SOLO LECTURA
-- para servicio-reportes. Idempotente: seguro de correr más de una vez.
--
-- No hardcodea ninguna contraseña real: la toma de la variable de entorno
-- REPORTES_DB_PASSWORD que debe existir en el shell antes de invocar psql.
--
-- Uso:
--   REPORTES_DB_PASSWORD='...' psql -U sca_user -d sca_it -f setup-readonly-user.sql
--
-- (o, contra el contenedor sca_it_db:
--   docker exec -e REPORTES_DB_PASSWORD='...' -i sca_it_db \
--     psql -U sca_user -d sca_it < setup-readonly-user.sql)

\getenv reportes_db_password REPORTES_DB_PASSWORD

\if :{?reportes_db_password}
\else
    \echo 'Falta la variable de entorno REPORTES_DB_PASSWORD.'
    \quit
\endif

-- CREATE/ALTER USER no puede recibir el valor de una variable psql (:'var')
-- directamente dentro de un bloque DO $$...$$ (psql no sustituye variables
-- dentro de dollar-quoting). Se arma el DDL como texto vía format() en una
-- consulta normal y se ejecuta con \gexec, que sí soporta la sustitución.
SELECT CASE
    WHEN EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'reportes_readonly')
        THEN format('ALTER USER reportes_readonly WITH PASSWORD %L', :'reportes_db_password')
        ELSE format('CREATE USER reportes_readonly WITH PASSWORD %L', :'reportes_db_password')
    END AS ddl
\gexec

GRANT CONNECT ON DATABASE sca_it TO reportes_readonly;
GRANT USAGE ON SCHEMA public TO reportes_readonly;
GRANT SELECT ON activos, historial_movimientos, estados_activo, ubicaciones, departamentos
    TO reportes_readonly;

-- /movimientos-recientes necesita el nombre del usuario responsable (join a
-- users). Grant a nivel de columna, no a la tabla completa: reportes_readonly
-- no debe poder leer email, password ni otras columnas sensibles de users.
GRANT SELECT (id, name) ON users TO reportes_readonly;
