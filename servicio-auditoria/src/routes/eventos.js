const express = require('express');
const pool = require('../db');

const router = express.Router();

const DEFAULT_LIMIT = 50;

router.post('/', async (req, res) => {
    const { activo_id: activoId, usuario, accion, detalle } = req.body || {};

    if (activoId === undefined || activoId === null || Number.isNaN(Number(activoId))) {
        return res.status(400).json({ error: 'El campo "activo_id" es obligatorio y debe ser numérico.' });
    }

    if (!usuario || typeof usuario !== 'string') {
        return res.status(400).json({ error: 'El campo "usuario" es obligatorio.' });
    }

    if (!accion || typeof accion !== 'string') {
        return res.status(400).json({ error: 'El campo "accion" es obligatorio.' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO auditoria_eventos (activo_id, usuario, accion, detalle)
             VALUES ($1, $2, $3, $4)
             RETURNING id, activo_id, usuario, accion, detalle, created_at`,
            [Number(activoId), usuario, accion, detalle ?? null]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al registrar evento de auditoría:', err);
        res.status(500).json({ error: 'No se pudo registrar el evento de auditoría.' });
    }
});

router.get('/', async (req, res) => {
    const { activo_id: activoId, accion, desde, hasta } = req.query;

    const limit = Math.min(Math.max(Number(req.query.limit) || DEFAULT_LIMIT, 1), 500);
    const offset = Math.max(Number(req.query.offset) || 0, 0);

    const conditions = [];
    const params = [];

    if (activoId !== undefined) {
        params.push(Number(activoId));
        conditions.push(`activo_id = $${params.length}`);
    }

    if (accion) {
        params.push(accion);
        conditions.push(`accion = $${params.length}`);
    }

    if (desde) {
        params.push(desde);
        conditions.push(`created_at >= $${params.length}`);
    }

    if (hasta) {
        params.push(hasta);
        conditions.push(`created_at <= $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    params.push(limit);
    const limitParam = `$${params.length}`;
    params.push(offset);
    const offsetParam = `$${params.length}`;

    try {
        const result = await pool.query(
            `SELECT id, activo_id, usuario, accion, detalle, created_at
             FROM auditoria_eventos
             ${whereClause}
             ORDER BY created_at DESC
             LIMIT ${limitParam} OFFSET ${offsetParam}`,
            params
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Error al consultar eventos de auditoría:', err);
        res.status(500).json({ error: 'No se pudieron consultar los eventos de auditoría.' });
    }
});

module.exports = router;
