import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CambioPIN from './CambioPIN'
import { StackNavigationProp } from '@react-navigation/stack';
import { useContextUsuario } from '../Context/Provider';
import axios from 'axios';
import api from '../Service/api';

type Paginas = {
  Login: undefined;
  CambioPIN: undefined;
  Aplicacion: undefined;
};

export default function Login() {
  const [celular, setCelular] = useState<string>('')
  const [PIN, setPIN] = useState<string>('')

  const { nombre, setNombre, identidad, setIdentidad, id, setID } = useContextUsuario();

  const navigation = useNavigation<StackNavigationProp<Paginas>>();

  const handleLogin = async () => {

    try {
      if (!celular || !PIN) {
        Alert.alert('Error', 'Por favor ingresa todos los campos');
        return;
      }
      else {
        let pindb = parseInt(PIN)


        const response = await api.post('apppin', { celular, pindb });

        if (response.status === 200) {
          if (pindb == 1234) {
            const { nombreres, identidadres, idres } = response.data;
            setID(idres)
            navigation.navigate('CambioPIN');


          } else {

            const { nombreres, identidadres, idres } = response.data;

            setNombre(nombreres);
            setIdentidad(identidadres);
            setID(idres);

            alert('Inicio de sesión exitoso');
            navigation.navigate('Aplicacion');

          }



        }



      }



    } catch (error) {
      // Si hay un error, mostrar el mensaje
      alert('Error, Credenciales incorrectas o servidor no disponible');
      console.error(error);
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