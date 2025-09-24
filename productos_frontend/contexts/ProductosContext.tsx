import React, {createContext, Component, ReactNode} from 'react';
import {Producto} from '../models/Producto';
import {ProductoForm, ImageData} from '../types';
import ApiService from '../api/ApiService';

interface ProductosContextType {
  productos: Producto[];
  loading: boolean;
  error: string | null;
  obtenerProductos: () => Promise<void>;
  crearProducto: (datos: ProductoForm, imagen?: ImageData) => Promise<Producto>;
  eliminarProducto: (id: number) => Promise<void>;
}

export const ProductosContext = createContext<ProductosContextType>({
  productos: [],
  loading: false,
  error: null,
  obtenerProductos: async () => {},
  crearProducto: async () => ({} as Producto),
  eliminarProducto: async () => {},
});

interface Props {
  children: ReactNode;
}

interface State {
  productos: Producto[];
  loading: boolean;
  error: string | null;
}

export class ProductosProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productos: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.obtenerProductos();
  }

  obtenerProductos = async (): Promise<void> => {
    try {
      this.setState({loading: true, error: null});
      const data = await ApiService.obtenerProductos();
      const productos = data.map(item => new Producto(item));
      this.setState({productos, loading: false});
    } catch (error) {
      this.setState({error: 'Error al obtener productos', loading: false});
    }
  };

  crearProducto = async (datosProducto: ProductoForm, imagen?: ImageData): Promise<Producto> => {
    try {
      this.setState({loading: true, error: null});
      const data = await ApiService.crearProducto(datosProducto, imagen);
      const nuevoProducto = new Producto(data);
      
      this.setState(prevState => ({
        productos: [nuevoProducto, ...prevState.productos],
        loading: false,
      }));

      return nuevoProducto;
    } catch (error) {
      this.setState({error: 'Error al crear producto', loading: false});
      throw error;
    }
  };

  eliminarProducto = async (id: number): Promise<void> => {
    try {
      this.setState({loading: true, error: null});
      await ApiService.eliminarProducto(id);
      
      this.setState(prevState => ({
        productos: prevState.productos.filter(p => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      this.setState({error: 'Error al eliminar producto', loading: false});
      throw error;
    }
  };

  render() {
    const contextValue: ProductosContextType = {
      productos: this.state.productos,
      loading: this.state.loading,
      error: this.state.error,
      obtenerProductos: this.obtenerProductos,
      crearProducto: this.crearProducto,
      eliminarProducto: this.eliminarProducto,
    };

    return (
      <ProductosContext.Provider value={contextValue}>
        {this.props.children}
      </ProductosContext.Provider>
    );
  }
}
