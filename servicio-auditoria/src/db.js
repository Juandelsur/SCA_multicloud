const { Pool } = require('pg');

// Mismo naming convention que .env de Laravel: DB_HOST, DB_PORT, DB_DATABASE,
// DB_USERNAME, DB_PASSWORD (no DB_NAME/DB_USER).
const pool = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'sca_it',
    user: process.env.DB_USERNAME || 'sca_user',
    password: process.env.DB_PASSWORD || 'sca_secret',
});

module.exports = pool;
