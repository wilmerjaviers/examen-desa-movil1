import {Producto as ProductoInterface} from '../types';

export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: 'Disponible' | 'No disponible';
  categoria: string;
  url_fotografia?: string;
  fecha_creacion?: Date;

  constructor(data: ProductoInterface) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion;
    this.precio = parseFloat(data.precio.toString());
    this.estado = data.estado;
    this.categoria = data.categoria;
    this.url_fotografia = data.url_fotografia;
    this.fecha_creacion = data.fecha_creacion ? new Date(data.fecha_creacion) : undefined;
  }

  estaDisponible(): boolean {
    return this.estado === 'Disponible';
  }

  getPrecioFormateado(): string {
    return `$${this.precio.toFixed(2)}`;
  }

  getFechaCreacion(): string {
    if (!this.fecha_creacion) return '';
    return this.fecha_creacion.toLocaleDateString('es-ES');
  }

  getImagenUrl(baseUrl: string = 'http://10.0.2.2:3000'): string | null {
    if (!this.url_fotografia) return null;
    return this.url_fotografia.startsWith('http') 
      ? this.url_fotografia 
      : `${baseUrl}${this.url_fotografia}`;
  }

  toJSON(): ProductoInterface {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      estado: this.estado,
      categoria: this.categoria,
      url_fotografia: this.url_fotografia
    };
  }
}
