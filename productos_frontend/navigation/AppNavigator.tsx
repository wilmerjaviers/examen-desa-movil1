import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import ProductosListScreen from '../pages/ProductosListScreen';
import ProductoFormScreen from '../pages/ProductoFormScreen';
import ProductoDetailScreen from '../pages/ProductoDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProductosList" 
        component={ProductosListScreen} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="ProductoForm" 
        component={ProductoFormScreen} 
        options={{headerShown: false}} 
      />
      <Stack.Screen 
        name="ProductoDetail" 
        component={ProductoDetailScreen} 
        options={{headerShown: false}} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
