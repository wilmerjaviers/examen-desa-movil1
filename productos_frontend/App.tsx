import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {ProductosProvider} from './contexts/ProductosContext';

const App: React.FC = () => {
  return (
    <ProductosProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ProductosProvider>
  );
};

export default App;
