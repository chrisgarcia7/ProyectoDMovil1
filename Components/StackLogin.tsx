import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import CambioPIN from './CambioPIN';
import Tabbar from './Tabbar';

export default function StackLogin() {
    const Stack = createStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' options={{ headerShown: false }} component={Login}/>
            <Stack.Screen name='CambioPIN' options={{ headerShown: false }} component={CambioPIN}/>
            <Stack.Screen name='Aplicacion' options={{ headerShown: false }} component={Tabbar}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}