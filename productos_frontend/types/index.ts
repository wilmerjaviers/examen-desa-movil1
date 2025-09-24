export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: 'Disponible' | 'No disponible';
  categoria: string;
  url_fotografia?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface ProductoForm {
  nombre: string;
  descripcion: string;
  precio: string;
  estado: 'Disponible' | 'No disponible';
  categoria: string;
}

export interface ImageData {
  uri: string;
  type: string;
  fileName?: string;
}

export type RootStackParamList = {
  ProductosList: undefined;
  ProductoForm: undefined;
  ProductoDetail: {producto: Producto};
};

export const CATEGORIAS = [
  'Electrónicos',
  'Ropa',
  'Hogar',
  'Deportes',
  'Libros',
  'Otros'
] as const;

export const ESTADOS = [
  'Disponible',
  'No disponible'
] as const;
