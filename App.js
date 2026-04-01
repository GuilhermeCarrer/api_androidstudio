import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#E63946', 
    secondary: '#457B9D',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#E63946' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Universo Aranha' }} 
          />

          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{ title: 'Sobre o Filme' }} 
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}