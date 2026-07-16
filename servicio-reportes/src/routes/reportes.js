const express = require('express');
const pool = require('../db');

const router = express.Router();

const DEFAULT_LIMIT_MOVIMIENTOS = 10;
const MAX_LIMIT_MOVIMIENTOS = 200;

async function desglosePorEstado(ubicacionId) {
    const params = [];
    let joinFilter = '';

    if (ubicacionId !== undefined) {
        params.push(ubicacionId);
        joinFilter = `AND a.ubicacion_actual_id = $${params.length}`;
    }

    const result = await pool.query(
        `SELECT ea.nombre_estado AS estado, COUNT(a.id)::int AS cantidad
         FROM estados_activo ea
         LEFT JOIN activos a ON a.estado_id = ea.id ${joinFilter}
         GROUP BY ea.id, ea.nombre_estado
         ORDER BY ea.nombre_estado`,
        params
    );

    const total = result.rows.reduce((sum, row) => sum + row.cantidad, 0);

    return result.rows.map((row) => ({
        estado: row.estado,
        cantidad: row.cantidad,
        porcentaje: total > 0 ? Number(((row.cantidad / total) * 100).toFixed(1)) : 0,
    }));
}

router.get('/activos-por-estado', async (req, res) => {
    try {
        res.json(await desglosePorEstado());
    } catch (err) {
        console.error('Error en /activos-por-estado:', err);
        res.status(500).json({ error: 'No se pudo generar el reporte de activos por estado.' });
    }
});

router.get('/activos-por-ubicacion', async (req, res) => {
    const { ubicacion_id: ubicacionIdRaw } = req.query;

    if (ubicacionIdRaw !== undefined && Number.isNaN(Number(ubicacionIdRaw))) {
        return res.status(400).json({ error: 'El parámetro "ubicacion_id" debe ser numérico.' });
    }

    try {
        const ubicacionId = ubicacionIdRaw !== undefined ? Number(ubicacionIdRaw) : undefined;
        res.json(await desglosePorEstado(ubicacionId));
    } catch (err) {
        console.error('Error en /activos-por-ubicacion:', err);
        res.status(500).json({ error: 'No se pudo generar el reporte de activos por ubicación.' });
    }
});

router.get('/movimientos-recientes', async (req, res) => {
    const { ubicacion_id: ubicacionIdRaw } = req.query;

    if (ubicacionIdRaw !== undefined && Number.isNaN(Number(ubicacionIdRaw))) {
        return res.status(400).json({ error: 'El parámetro "ubicacion_id" debe ser numérico.' });
    }

    const limit = Math.min(
        Math.max(Number(req.query.limit) || DEFAULT_LIMIT_MOVIMIENTOS, 1),
        MAX_LIMIT_MOVIMIENTOS
    );

    const params = [];
    let whereClause = '';

    if (ubicacionIdRaw !== undefined) {
        params.push(Number(ubicacionIdRaw));
        whereClause = `WHERE hm.ubicacion_destino_id = $${params.length}`;
    }

    params.push(limit);
    const limitParam = `$${params.length}`;

    try {
        const result = await pool.query(
            `SELECT hm.id,
                    hm.tipo_movimiento,
                    hm.created_at,
                    a.codigo_inventario,
                    a.marca,
                    a.modelo,
                    u.name AS usuario,
                    ud.nombre_ubicacion AS ubicacion_destino
             FROM historial_movimientos hm
             JOIN activos a ON a.id = hm.activo_id
             JOIN users u ON u.id = hm.usuario_registra_id
             LEFT JOIN ubicaciones ud ON ud.id = hm.ubicacion_destino_id
             ${whereClause}
             ORDER BY hm.created_at DESC
             LIMIT ${limitParam}`,
            params
        );

        res.json(result.rows);
    } catch (err) {
        console.error('Error en /movimientos-recientes:', err);
        res.status(500).json({ error: 'No se pudo generar el reporte de movimientos recientes.' });
    }
});

module.exports = router;
