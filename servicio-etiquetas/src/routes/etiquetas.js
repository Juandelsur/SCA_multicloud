const express = require('express');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');

const router = express.Router();

const MAX_CODIGOS = 100;
const COLUMNS = 3;
const QR_SIZE = 140;
const CELL_HEIGHT = QR_SIZE + 40;

router.post('/', async (req, res) => {
    const { codigos } = req.body || {};

    if (!Array.isArray(codigos) || codigos.length === 0) {
        return res.status(400).json({
            error: 'El body debe incluir un array "codigos" no vacío.',
        });
    }

    if (codigos.length > MAX_CODIGOS) {
        return res.status(400).json({
            error: `Máximo ${MAX_CODIGOS} códigos por solicitud (se recibieron ${codigos.length}).`,
        });
    }

    try {
        const qrBuffers = await Promise.all(
            codigos.map((codigo) => QRCode.toBuffer(String(codigo), { width: 200, margin: 1 }))
        );

        const doc = new PDFDocument({ size: 'A4', margin: 30 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="etiquetas.pdf"');
        doc.pipe(res);

        const startX = doc.page.margins.left;
        const startY = doc.page.margins.top;
        const usableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        const usableHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
        const cellWidth = usableWidth / COLUMNS;
        const rowsPerPage = Math.max(1, Math.floor(usableHeight / CELL_HEIGHT));
        const perPage = COLUMNS * rowsPerPage;

        codigos.forEach((codigo, i) => {
            if (i > 0 && i % perPage === 0) {
                doc.addPage();
            }

            const posInPage = i % perPage;
            const col = posInPage % COLUMNS;
            const row = Math.floor(posInPage / COLUMNS);

            const cellX = startX + col * cellWidth;
            const cellY = startY + row * CELL_HEIGHT;
            const qrX = cellX + (cellWidth - QR_SIZE) / 2;

            doc.image(qrBuffers[i], qrX, cellY, { width: QR_SIZE, height: QR_SIZE });
            doc.fontSize(10).text(String(codigo), cellX, cellY + QR_SIZE + 6, {
                width: cellWidth,
                align: 'center',
            });
        });

        doc.end();
    } catch (err) {
        console.error('Error generando PDF de etiquetas:', err);

        if (!res.headersSent) {
            res.status(500).json({ error: 'No se pudo generar el PDF de etiquetas.' });
        } else {
            res.end();
        }
    }
});

module.exports = router;
