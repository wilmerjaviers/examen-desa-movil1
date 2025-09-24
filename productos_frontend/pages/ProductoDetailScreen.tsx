import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {Producto} from '../models/Producto';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductoDetail'>;
type RoutePropType = RouteProp<RootStackParamList, 'ProductoDetail'>;

interface Props {
  navigation: NavigationProp;
  route: RoutePropType;
}

export default class ProductoDetailScreen extends Component<Props> {
  render() {
    const {producto: productoData} = this.props.route.params;
    const producto = new Producto(productoData);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Detalle del Producto</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalle</Text>
            <Text style={styles.subtitle}>Ver detalle del Item</Text>
            
            <View style={styles.imageContainer}>
              {producto.url_fotografia ? (
                <Image 
                  source={{uri: producto.getImagenUrl()!}} 
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageIcon}>🖼️</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nombre:</Text>
              <Text style={styles.infoValue}>{producto.nombre}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Precio:</Text>
              <Text style={[styles.infoValue, styles.priceText]}>{producto.getPrecioFormateado()}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estado:</Text>
              <Text style={[
                styles.infoValue,
                {color: producto.estaDisponible() ? '#34C759' : '#FF3B30'}
              ]}>
                {producto.estado}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Categoría:</Text>
              <Text style={styles.infoValue}>{producto.categoria}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.infoLabel}>Descripción:</Text>
              <Text style={styles.descriptionText}>{producto.descripcion}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.eliminarButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.eliminarButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#FFE4B5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFA500',
    borderStyle: 'dashed',
  },
  imageIcon: {
    fontSize: 80,
    opacity: 0.7,
  },
  infoContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 120,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  priceText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  descriptionContainer: {
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginTop: 5,
    textAlign: 'justify',
  },
  eliminarButton: {
    backgroundColor: '#FF69B4',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  eliminarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
