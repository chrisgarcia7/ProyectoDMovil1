import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContextUsuario } from '../Context/Provider';
import api from '../Service/api';

type Paginas = {
    Login: undefined;
    CambioPIN: undefined;
    Inicio: undefined;
    Perfil: undefined;
  };

export default function CambioPIN() {
    const[newPIN, setNewPIN] = useState<string>('');
    const[oldPIN, setOldPIN] = useState<string>('');

    const navigation = useNavigation<StackNavigationProp<Paginas>>();
    const { id, setID, regresarPerfil, setRegresarPerfil } = useContextUsuario();

  const handleChangePIN = async () => {
    if (!oldPIN || !newPIN) {
      alert('Error, Por favor ingresa ambos PINs');
      return;
    } else if (newPIN.length<5){
      alert('El nuevo pin tiene que tener mas de 4 caracteres')
      return;
    } else if(newPIN==oldPIN){
      alert('el nuevo pin tiene que ser diferente al anterior pin')
    }else if(newPIN=='12345'){
      alert('el pin no puede ser igual a 12345')
    }else{




      try {
        console.log('esta llegando al try')
        const response = await api.put(`apppin/${id}`, { id, oldPIN, newPIN })
        if (response.status === 200) {
          console.log('cambio de pin')
          alert('PIN cambiado exitosamente');
          if (regresarPerfil==true){
            console.log('llego al if si el regresarPerfil es true', regresarPerfil)
            navigation.navigate('Perfil');
            setRegresarPerfil(false);
          }else{
            console.log('llego al if si el regresarPerfil es false', regresarPerfil)
            navigation.navigate('Login');

          }
          
        } else {
          alert('PIN incorrecto')
        }

      } catch (error) {
        alert('Error, PIN incorrecto o servidor no disponible');
        console.error(error);

      }

    }

  };

  const perfil = () => {
    setRegresarPerfil(false)


    navigation.navigate('Perfil');

  }






  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cambiar PIN</Text>

      <TextInput
        placeholder="Viejo PIN"
        value={oldPIN}
        onChangeText={setOldPIN}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        placeholder="Nuevo PIN"
        value={newPIN}
        onChangeText={setNewPIN}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePIN}>
        <Text style={styles.buttonText}>Cambiar PIN</Text>
      </TouchableOpacity>

      {regresarPerfil ? 
      <TouchableOpacity style={styles.regresarButton} onPress={perfil}>
        <Text style={styles.regresarButtonText}>Regresar a Perfil</Text>
      </TouchableOpacity> : ''}
    </View>
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
    regresarButton: {
      backgroundColor: '#007BFF', // Un color azul atractivo
      height: 50,
      borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007BFF',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, 
  },
  regresarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});