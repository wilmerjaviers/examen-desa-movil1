# Administración de Productos - React Native + TypeScript + Expo v51

Aplicación móvil para administración de productos siguiendo el mockup del documento.

## Estructura del Proyecto (Sin carpeta src)

```
├── App.tsx                    # Punto de entrada
├── api/ApiService.ts         # Conexión con backend MySQL
├── components/               # Componentes reutilizables  
├── contexts/                 # Context providers (class components)
├── models/Producto.ts        # Modelo de datos con métodos
├── pages/                    # Pantallas principales
│   ├── ProductosListScreen.tsx    # Lista formato tabla
│   ├── ProductoFormScreen.tsx     # Formulario con dropdowns
│   └── ProductoDetailScreen.tsx   # Pantalla detalle
├── navigation/               # Configuración navegación
├── types/                    # Tipos TypeScript
├── utils/                    # Utilidades
└── assets/                   # Recursos estáticos
```

## Instalación

```bash
cd productos_frontend
npm install
expo start
```

## Configuración Backend

Ajustar IP en `api/ApiService.ts`:
- Emulador Android: `http://10.0.2.2:3000/api`
- Dispositivo físico: `http://[TU_IP_LOCAL]:3000/api`

## Características implementadas

- **Lista tipo tabla** siguiendo mockup exacto
- **Formulario vertical** con dropdowns nativos
- **Pantalla detalle** con sección "Detalle" 
- **Colores del mockup**: botones verdes "Ver", rosa "Eliminar"
- **Carga de imágenes** con expo-image-picker
- **Conexión MySQL** via API REST con axios
- **Class components** sin hooks
- **TypeScript** completo

## Dependencias principales

- Expo v51 con React Native 0.74.5
- axios para conexión con backend MySQL
- expo-image-picker + expo-camera para imágenes
- React Navigation para pantallas
- TypeScript para tipado

## Backend requerido

El frontend se conecta a una API REST Node.js + MySQL con estos endpoints:
- GET /api/productos
- POST /api/productos  
- DELETE /api/productos/:id

