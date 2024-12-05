import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContextUsuario } from '../Context/Provider';

type Paginas = {
    Login: undefined;
    CambioPIN: undefined;
    Inicio: undefined;
  };

export default function Perfil() {
    const {nombre,setNombre, identidad, setIdentidad, regresarPerfil, setRegresarPerfil} = useContextUsuario();

    const navigation = useNavigation<StackNavigationProp<Paginas>>();

    const LogOut = () => {
        setNombre('');
        setIdentidad('');
        navigation.navigate('Login')

    }

    const cambio=() =>{
        setRegresarPerfil(true);
        navigation.navigate('CambioPIN')

    }

    

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Perfil</Text>
            
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>{nombre}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>ID:</Text>
                    <Text style={styles.value}>{identidad}</Text>
                </View>
            </View>
      <TouchableOpacity style={styles.button} onPress={cambio}>
        <Text style={styles.buttonText}>Cambiar PIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonlogout} onPress={LogOut}>
        <Text style={styles.buttonTextlogout}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f9',  
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',  
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, 
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        width: '30%',
    },
    value: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    buttonlogout: {
        backgroundColor: '#FF6347', 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 20,
    },
    buttonTextlogout: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',  
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
  });
  