-- Tabla propia de servicio-auditoria. No reutiliza ni toca auditoria_logs
-- (esa es de la app Laravel).
CREATE TABLE IF NOT EXISTS auditoria_eventos (
    id BIGSERIAL PRIMARY KEY,
    activo_id BIGINT NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    accion VARCHAR(100) NOT NULL,
    detalle TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_auditoria_eventos_activo_id ON auditoria_eventos (activo_id);
CREATE INDEX IF NOT EXISTS idx_auditoria_eventos_accion ON auditoria_eventos (accion);
CREATE INDEX IF NOT EXISTS idx_auditoria_eventos_created_at ON auditoria_eventos (created_at DESC);
