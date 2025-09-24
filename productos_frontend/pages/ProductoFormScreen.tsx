import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProductosContext} from '../contexts/ProductosContext';
import {RootStackParamList, CATEGORIAS, ESTADOS, ImageData} from '../types';
import * as ImagePicker from 'expo-image-picker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductoForm'>;

interface Props {
  navigation: NavigationProp;
}

interface State {
  nombre: string;
  descripcion: string;
  precio: string;
  estado: 'Disponible' | 'No disponible';
  categoria: string;
  imagen: ImageData | null;
  showEstados: boolean;
  showCategorias: boolean;
}

export default class ProductoFormScreen extends Component<Props, State> {
  static contextType = ProductosContext;
  declare context!: React.ContextType<typeof ProductosContext>;

  constructor(props: Props) {
    super(props);
    this.state = {
      nombre: '',
      descripcion: '',
      precio: '',
      estado: 'Disponible',
      categoria: '',
      imagen: null,
      showEstados: false,
      showCategorias: false,
    };
  }

  handleInputChange = (field: keyof State, value: string) => {
    this.setState({ [field]: value } as unknown as Pick<State, keyof State>);
  };

  seleccionarImagen = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      this.setState({
        imagen: {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          fileName: 'producto.jpg'
        }
      });
    }
  };

  guardarProducto = async () => {
    const {nombre, descripcion, precio, estado, categoria, imagen} = this.state;

    if (!nombre.trim() || !descripcion.trim() || !precio.trim() || !categoria.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (isNaN(parseFloat(precio)) || parseFloat(precio) <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor a 0');
      return;
    }

    try {
      await this.context.crearProducto({
        nombre,
        descripcion,
        precio,
        estado,
        categoria
      }, imagen || undefined);

      Alert.alert('Éxito', 'Producto creado correctamente', [
        {text: 'OK', onPress: () => this.props.navigation.goBack()}
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el producto');
    }
  };

  renderDropdown = (
    items: readonly string[],
    selectedValue: string,
    onSelect: (value: string) => void,
    isVisible: boolean,
    toggleVisible: () => void
  ) => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleVisible}>
        <Text style={styles.dropdownText}>{selectedValue || 'Seleccionar...'}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.dropdownList}>
          {items.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(item);
                toggleVisible();
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  render() {
    const {nombre, descripcion, precio, estado, categoria, imagen, showEstados, showCategorias} = this.state;
    const {loading} = this.context;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Agregar Producto</Text>
        </View>
        
        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={(text) => this.handleInputChange('nombre', text)}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={(text) => this.handleInputChange('descripcion', text)}
            multiline
            numberOfLines={3}
          />

          {this.renderDropdown(
            ESTADOS,
            estado,
            (value) => this.handleInputChange('estado', value as 'Disponible' | 'No disponible'),
            showEstados,
            () => this.setState({showEstados: !showEstados, showCategorias: false})
          )}

          {this.renderDropdown(
            CATEGORIAS,
            categoria,
            (value) => this.handleInputChange('categoria', value),
            showCategorias,
            () => this.setState({showCategorias: !showCategorias, showEstados: false})
          )}

          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={precio}
            onChangeText={(text) => this.handleInputChange('precio', text)}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.imageContainer} onPress={this.seleccionarImagen}>
            {imagen ? (
              <Image source={{uri: imagen.uri}} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageIcon}>🖼️</Text>
                <Text style={styles.imageText}>Fotografía Item</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={this.guardarProducto}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.deleteButtonText}>Delete Items</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  header: {
    backgroundColor: '#007AFF',
    paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  form: {flex: 1, padding: 20},
  input: {
    backgroundColor: 'white', borderRadius: 8, padding: 15, marginBottom: 15,
    borderWidth: 1, borderColor: '#ddd', fontSize: 16,
  },
  textArea: {height: 80, textAlignVertical: 'top'},
  dropdownContainer: {marginBottom: 15, zIndex: 1000},
  dropdown: {
    backgroundColor: 'white', borderRadius: 8, padding: 15,
    borderWidth: 1, borderColor: '#ddd',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  dropdownText: {fontSize: 16, color: '#333'},
  dropdownArrow: {fontSize: 12, color: '#666'},
  dropdownList: {
    backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#ddd',
    marginTop: 5, maxHeight: 150,
  },
  dropdownItem: {padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee'},
  dropdownItemText: {fontSize: 16, color: '#333'},
  imageContainer: {alignItems: 'center', marginBottom: 20},
  imagePreview: {width: 150, height: 150, borderRadius: 8},
  imagePlaceholder: {
    width: 150, height: 150, backgroundColor: '#FFE4B5', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#FFA500', borderStyle: 'dashed',
  },
  imageIcon: {fontSize: 40, marginBottom: 10},
  imageText: {fontSize: 14, color: '#FF8C00', fontWeight: 'bold'},
  saveButton: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 8,
    alignItems: 'center', marginBottom: 15,
  },
  saveButtonDisabled: {opacity: 0.6},
  saveButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  deleteButton: {
    backgroundColor: '#34C759', padding: 15, borderRadius: 8,
    alignItems: 'center', marginBottom: 30,
  },
  deleteButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});
