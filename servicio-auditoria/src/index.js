const express = require('express');
const eventosRouter = require('./routes/eventos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'auditoria' });
});

app.use('/eventos', eventosRouter);

app.listen(PORT, () => {
    console.log(`servicio-auditoria escuchando en el puerto ${PORT}`);
});
