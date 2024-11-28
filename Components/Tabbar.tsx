import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './Inicio';
import Perfil from './Perfil';
import { Ionicons } from '@expo/vector-icons';

export default function Tabbar() {

    const tab = createBottomTabNavigator();
    
  return (


        <tab.Navigator initialRouteName='Inicio'>
            <tab.Screen name='Inicio' component={Inicio} options={{
            tabBarLabel: 'Inicio', 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} /> 
            ),
          }}/>
            <tab.Screen name='Perfil' component={Perfil} options={{
            tabBarLabel: 'Perfil', 
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} /> 
            ),
          }}/>
        </tab.Navigator>

  )
}