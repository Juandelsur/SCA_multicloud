const express = require('express');
const reportesRouter = require('./routes/reportes');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'reportes' });
});

app.use('/', reportesRouter);

app.listen(PORT, () => {
    console.log(`servicio-reportes escuchando en el puerto ${PORT}`);
});
