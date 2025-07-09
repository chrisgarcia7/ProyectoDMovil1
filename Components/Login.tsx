import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CambioPIN from './CambioPIN'
import { StackNavigationProp } from '@react-navigation/stack';
import { useContextUsuario } from '../Context/Provider';
import axios from 'axios';
import api from '../Service/api';
import { LinearGradient } from 'expo-linear-gradient';

type Paginas = {
  Login: undefined;
  CambioPIN: undefined;
  Aplicacion: undefined;
};

export default function Login() {
  const [celular, setCelular] = useState<string>('')
  const [PIN, setPIN] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { nombre, setNombre, identidad, setIdentidad, id, setID, cod_cliente, setCod_cliente } = useContextUsuario();
  const navigation = useNavigation<StackNavigationProp<Paginas>>();

  const handleLogin = async () => {
    try {
      if (!celular || !PIN) {
        Alert.alert('Error', 'Por favor ingresa todos los campos');
        return;
      }
      
      setLoading(true);
      let pindb = parseInt(PIN)
      const response = await api.post('apppin', { celular, pindb });
      
      if (response.status === 200) {
        if (pindb == 12345) {
          const { nombreres, identidadres, idres, codigo_clienteres } = response.data;
          setID(idres)
          navigation.navigate('CambioPIN');
        } else {
          const { nombreres, identidadres, idres, codigo_clienteres } = response.data;
          setNombre(nombreres);
          setIdentidad(identidadres);
          setID(idres);
          setCod_cliente(codigo_clienteres);
          Alert.alert('Éxito', 'Inicio de sesión exitoso');
          navigation.navigate('Aplicacion');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas o servidor no disponible');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/LogoCooperativa.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.header}>Bienvenido</Text>
        <Text style={styles.subHeader}>Accede a tu Coop digital</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Número de Celular</Text>
          <TextInput 
            placeholder='Ingresa tu número de celular' 
            style={styles.input} 
            value={celular} 
            onChangeText={setCelular}
            keyboardType="phone-pad"
            maxLength={8}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>PIN</Text>
          <TextInput 
            placeholder='Ingresa tu PIN' 
            value={PIN} 
            style={styles.input} 
            onChangeText={setPIN} 
            secureTextEntry
            keyboardType="numeric"
            maxLength={8}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            ¿Problemas para acceder? Contacta a tu cooperativa
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerSection: {
    backgroundColor: '#1a365d',
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logoContainer: {
    backgroundColor: '#ffffff',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logo: {
    width: 80,
    height: 80,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#cbd5e0',
    textAlign: 'center',
    fontWeight: '400',
  },
  formSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2d3748',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#2b6cb0',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#2b6cb0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerSection: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
});