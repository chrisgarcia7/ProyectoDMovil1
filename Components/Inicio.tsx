import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native'
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
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a365d" />
      
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.greetingText}>{getGreeting()}</Text>
          <Text style={styles.nameText}>{nombre}</Text>
          <Text style={styles.clientCodeText}>Cliente: {cod_cliente}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.contentSection} showsVerticalScrollIndicator={false}>
        
        {/* Ahorros Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={[styles.sectionIndicator, { backgroundColor: '#10b981' }]} />
              <Text style={styles.sectionTitle}>Cuentas de Ahorro</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Consulta tus saldos y movimientos</Text>
          </View>
          <Ahorros />
        </View>

        {/* Prestamos Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={[styles.sectionIndicator, { backgroundColor: '#f59e0b' }]} />
              <Text style={styles.sectionTitle}>Préstamos</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Revisa el estado de tus créditos</Text>
          </View>
          <Prestamos />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 18,
    color: '#cbd5e0',
    fontWeight: '400',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  clientCodeText: {
    fontSize: 14,
    color: '#a0aec0',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 16,
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 20,
  },
});