import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Tabbar from './Tabbar';
import Historial from './Historial';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './Inicio';

export default function Boton() {
    const Stack = createStackNavigator();
  return (

        <Stack.Navigator initialRouteName='Inicio'>
            <Stack.Screen name='Detalles' options={{ headerShown: false }} component={Historial}/>
            <Stack.Screen name='Inicio' options={{ headerShown: false }} component={Inicio}/>
        </Stack.Navigator>
  )
}
