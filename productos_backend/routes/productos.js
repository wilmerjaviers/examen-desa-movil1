const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productosController');
const upload = require('../middleware/upload');

// GET /api/productos - Obtener todos los productos
router.get('/', ProductosController.obtenerTodos);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', ProductosController.obtenerPorId);

// POST /api/productos - Crear nuevo producto
router.post('/', upload.single('imagen'), ProductosController.crear);

// DELETE /api/productos/:id - Eliminar producto
router.delete('/:id', ProductosController.eliminar);

module.exports = router;
