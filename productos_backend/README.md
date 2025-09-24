# API de Productos - Backend

API REST desarrollada en Node.js con Express y MySQL para la administración de productos.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar base de datos:
   - Crear la base de datos ejecutando el archivo `database.sql` en MySQL
   - Configurar las credenciales en el archivo `.env`

3. Ejecutar el servidor:
```bash
npm run dev
```

## Endpoints

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto (con imagen)
- `DELETE /api/productos/:id` - Eliminar producto

## Estructura del Producto

```json
{
  "nombre": "string",
  "descripcion": "string", 
  "precio": "number",
  "estado": "Disponible|No disponible",
  "categoria": "string",
  "url_fotografia": "string"
}
```

## Configuración

Ajustar las credenciales de MySQL en el archivo `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=productos_db
```
