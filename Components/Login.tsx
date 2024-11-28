import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CambioPIN from './CambioPIN'
import { StackNavigationProp } from '@react-navigation/stack';

type Paginas = {
    Login: undefined;
    CambioPIN: undefined;
    Aplicacion: undefined;
  };

export default function Login() {
    const [celular,setCelular] = useState<string>('')
    const [PIN, setPIN] = useState<string>('')

    const navigation = useNavigation<StackNavigationProp<Paginas>>();

    const handleLogin = () => {
        if (PIN === '12345') {
          navigation.navigate('CambioPIN'); 
        } else {
            Alert.alert('Error', 'PIN incorrecto');
            navigation.navigate('Aplicacion'); 
        }
      };
  return (

      <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Bienvenido</Text>
      <TextInput placeholder='Numero de Celular' style={styles.input} value={celular} onChangeText={setCelular}></TextInput>
      <TextInput placeholder='PIN' value={PIN} style={styles.input} onChangeText={setPIN} secureTextEntry></TextInput>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      </SafeAreaView>

  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', 
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#003366', 
      textAlign: 'center',
      marginBottom: 40,
    },
    input: {
      height: 50,
      borderColor: '#28a745', 
      borderWidth: 1,
      borderRadius: 25, 
      paddingLeft: 15,
      marginBottom: 20,
      fontSize: 16,
      color: '#000', 
    },
    button: {
      backgroundColor: '#28a745', 
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff', 
      fontSize: 18,
      fontWeight: 'bold',
    },
  });