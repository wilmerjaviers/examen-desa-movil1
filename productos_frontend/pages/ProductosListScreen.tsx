import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProductosContext} from '../contexts/ProductosContext';
import {RootStackParamList} from '../types';
import {Producto} from '../models/Producto';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductosList'>;

interface Props {
  navigation: NavigationProp;
}

export default class ProductosListScreen extends Component<Props> {
  static contextType = ProductosContext;
  declare context: React.ContextType<typeof ProductosContext>;

  verDetalle = (producto: Producto) => {
    this.props.navigation.navigate('ProductoDetail', {producto: producto.toJSON()});
  };

  confirmarEliminar = (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar este producto?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Eliminar', style: 'destructive', onPress: () => this.eliminarProducto(id)}
      ]
    );
  };

  eliminarProducto = async (id: number) => {
    try {
      await this.context.eliminarProducto(id);
      Alert.alert('Éxito', 'Producto eliminado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
    }
  };

  irAFormulario = () => {
    this.props.navigation.navigate('ProductoForm');
  };

  renderProductoRow = (producto: Producto) => (
    <View key={producto.id} style={styles.row}>
      <Text style={styles.cellNombre}>{producto.nombre}</Text>
      <Text style={styles.cellPrecio}>{producto.getPrecioFormateado()}</Text>
      <Text style={styles.cellDescripcion} numberOfLines={2}>{producto.descripcion}</Text>
      <TouchableOpacity 
        style={styles.verButton} 
        onPress={() => this.verDetalle(producto)}
      >
        <Text style={styles.buttonText}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const {productos, loading, error} = this.context;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Productos</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerNombre}>Nombre</Text>
            <Text style={styles.headerPrecio}>Precio</Text>
            <Text style={styles.headerDescripcion}>Descripción</Text>
            <Text style={styles.headerAction}>Acción</Text>
          </View>

          <ScrollView style={styles.tableContent}>
            {productos.map(producto => this.renderProductoRow(producto))}
          </ScrollView>
        </View>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={this.irAFormulario}
        >
          <Text style={styles.addButtonText}>+ Agregar Producto</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#FF3B30',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerNombre: {
    flex: 2,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  headerPrecio: {
    flex: 1,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  headerDescripcion: {
    flex: 2,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  headerAction: {
    flex: 1,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  tableContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  cellNombre: {
    flex: 2,
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  cellPrecio: {
    flex: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: 'bold',
  },
  cellDescripcion: {
    flex: 2,
    paddingHorizontal: 10,
    color: '#666',
  },
  verButton: {
    flex: 1,
    backgroundColor: '#34C759',
    marginHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
