const express = require('express');
const etiquetasRouter = require('./routes/etiquetas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'etiquetas' });
});

app.use('/generar', etiquetasRouter);

app.listen(PORT, () => {
    console.log(`servicio-etiquetas escuchando en el puerto ${PORT}`);
});
