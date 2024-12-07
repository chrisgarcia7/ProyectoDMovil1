import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Children } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ahorros from  '../Components/Tablero/AhorrosComponent'
import Prestamos from  '../Components/Tablero/PrestamosComponent'
import { useContextUsuario } from '../Context/Provider';


type Paginas = {
  Login: undefined;
  CambioPIN: undefined;
  Inicio: undefined;
  Detalles: undefined;
};


export default function Inicio() {

  const {nombre, cod_cliente} = useContextUsuario()


  const navigation = useNavigation<StackNavigationProp<Paginas>>();

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Bienvenido: {nombre}</Text>
      <Text style={styles.textTitle}>Codigo de Cliente: {cod_cliente}</Text>
      <Text> </Text>
      <Text style={styles.textAhorro}>Ahorros</Text>
      <Ahorros></Ahorros>
      <Text> </Text>
      <Text style={styles.textPrestamo}>Prestamos</Text>
      <Prestamos></Prestamos>
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
  textTitle: {
    //fontSize: 18,
    fontWeight: 'bold',
    color: '#003366', 
    textAlign: 'center',
    //marginBottom: 40,
  },
  textAhorro: {
    //fontSize: 18,
    fontWeight: 'bold',
    color: '#abcf6b', 
    marginTop: 15,
  },
  textPrestamo: {
    //fontSize: 18,
    fontWeight: 'bold',
    color: '#c58a90', 
    //marginBottom: 40,
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