const Producto = require('../models/Producto');

class ProductosController {
  static async obtenerTodos(req, res) {
    try {
      const productos = await Producto.obtenerTodos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const producto = await Producto.obtenerPorId(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  static async crear(req, res) {
    try {
      const { nombre, descripcion, precio, estado, categoria } = req.body;
      
      if (!nombre || !descripcion || !precio || !estado || !categoria) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const url_fotografia = req.file ? `/uploads/${req.file.filename}` : null;

      const nuevoProducto = await Producto.crear({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        estado,
        categoria,
        url_fotografia
      });

      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear producto' });
    }
  }

  static async eliminar(req, res) {
    try {
      const eliminado = await Producto.eliminar(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
}

module.exports = ProductosController;
