-- Crear base de datos
CREATE DATABASE IF NOT EXISTS productos_db;
USE productos_db;

-- Crear tabla productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    estado ENUM('Disponible', 'No disponible') DEFAULT 'Disponible',
    categoria VARCHAR(100) NOT NULL,
    url_fotografia VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, estado, categoria) VALUES
('Laptop Dell', 'Laptop Dell Inspiron 15 3000', 599.99, 'Disponible', 'Electrónicos'),
('Mouse Logitech', 'Mouse inalámbrico Logitech M705', 49.99, 'Disponible', 'Accesorios'),
('Teclado Mecánico', 'Teclado mecánico RGB gaming', 89.99, 'No disponible', 'Accesorios');
