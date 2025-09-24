const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productosRoutes = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/productos', productosRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'API de Productos funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
