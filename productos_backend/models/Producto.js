const db = require('../config/database');

class Producto {
  static async obtenerTodos() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM productos ORDER BY id DESC', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(datos) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO productos (nombre, descripcion, precio, estado, categoria, url_fotografia) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const valores = [
        datos.nombre,
        datos.descripcion,
        datos.precio,
        datos.estado,
        datos.categoria,
        datos.url_fotografia
      ];

      db.query(query, valores, (err, results) => {
        if (err) reject(err);
        else resolve({ id: results.insertId, ...datos });
      });
    });
  }

  static async eliminar(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  }

  static async actualizar(id, datos) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE productos 
        SET nombre = ?, descripcion = ?, precio = ?, estado = ?, categoria = ?, url_fotografia = ?
        WHERE id = ?
      `;
      const valores = [
        datos.nombre,
        datos.descripcion,
        datos.precio,
        datos.estado,
        datos.categoria,
        datos.url_fotografia,
        id
      ];

      db.query(query, valores, (err, results) => {
        if (err) reject(err);
        else resolve(results.affectedRows > 0);
      });
    });
  }
}

module.exports = Producto;
