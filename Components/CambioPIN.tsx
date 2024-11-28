import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Paginas = {
    Login: undefined;
    CambioPIN: undefined;
    Inicio: undefined;
  };

export default function CambioPIN() {
    const[newPIN, setNewPIN] = useState<string>('');
    const[oldPIN, setOldPIN] = useState<string>('');

    const navigation = useNavigation<StackNavigationProp<Paginas>>();

    const handleChangePIN = () => {
        navigation.navigate('Login');
        
        // Aquí puedes agregar la lógica para cambiar el PIN, por ejemplo, guardarlo en el estado o enviarlo al servidor.
        alert('PIN cambiado exitosamente');
      };
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
  });