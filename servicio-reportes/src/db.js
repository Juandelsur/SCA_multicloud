const { Pool } = require('pg');

// Mismo naming convention que .env de Laravel: DB_HOST, DB_PORT, DB_DATABASE,
// DB_USERNAME, DB_PASSWORD. Se conecta con reportes_readonly (ver
// scripts/setup-readonly-user.sql), un usuario de solo lectura: aunque haya
// un bug en este código, la base de datos no puede escribirse desde acá.
const pool = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'sca_it',
    user: process.env.DB_USERNAME || 'reportes_readonly',
    password: process.env.DB_PASSWORD,
});

module.exports = pool;
