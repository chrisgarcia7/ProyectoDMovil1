import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './Inicio';
import Perfil from './Perfil';
import { Ionicons } from '@expo/vector-icons';
import Boton from './Boton';

export default function Tabbar() {
    const Tab = createBottomTabNavigator();
   
    return (
        <Tab.Navigator 
            initialRouteName='Inicio'
            screenOptions={{
                // Header styling
                headerStyle: {
                    backgroundColor: '#1a365d',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 8,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                },
                headerTitleAlign: 'center',
                
                // Tab bar styling
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 0,
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    height: Platform.OS === 'ios' ? 90 : 70,
                    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
                    paddingTop: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: 'absolute',
                },
                tabBarActiveTintColor: '#2b6cb0',
                tabBarInactiveTintColor: '#a0aec0',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginBottom: 2,
                },
                // Custom tab bar background
                tabBarBackground: () => (
                    <View style={{
                        flex: 1,
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }} />
                ),
            }}
        >
            <Tab.Screen 
                name='Inicio' 
                component={Boton} 
                options={{
                    tabBarLabel: 'Inicio',
                    headerTitle: '🏦 Tu Cooperativa Digital',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? '#ebf8ff' : 'transparent',
                            borderRadius: 12,
                            padding: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Ionicons 
                                name={focused ? "home" : "home-outline"} 
                                size={focused ? size + 1 : size} 
                                color={color} 
                            />
                        </View>
                    ),
                }}
            />
            
            <Tab.Screen 
                name='Perfil' 
                component={Perfil} 
                options={{
                    tabBarLabel: 'Perfil',
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{
                            backgroundColor: focused ? '#ebf8ff' : 'transparent',
                            borderRadius: 12,
                            padding: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Ionicons 
                                name={focused ? "person" : "person-outline"} 
                                size={focused ? size + 1 : size} 
                                color={color} 
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}