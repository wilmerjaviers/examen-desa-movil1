import axios from 'axios';
import {Producto as ProductoInterface, ProductoForm, ImageData} from '../types';

const API_BASE = 'http://192.168.10.184:3000/api';

class ApiService {
  private api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
  });

  async obtenerProductos(): Promise<ProductoInterface[]> {
    const response = await this.api.get('/productos');
    return response.data;
  }

  async obtenerProducto(id: number): Promise<ProductoInterface> {
    const response = await this.api.get(`/productos/${id}`);
    return response.data;
  }

  async crearProducto(producto: ProductoForm, imagen?: ImageData): Promise<ProductoInterface> {
    const formData = new FormData();
    
    Object.keys(producto).forEach(key => {
      formData.append(key, (producto as any)[key]);
    });

    if (imagen) {
      formData.append('imagen', {
        uri: imagen.uri,
        type: imagen.type,
        name: imagen.fileName || 'producto.jpg',
      } as any);
    }

    const response = await this.api.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  async eliminarProducto(id: number): Promise<void> {
    await this.api.delete(`/productos/${id}`);
  }
}

export default new ApiService();
