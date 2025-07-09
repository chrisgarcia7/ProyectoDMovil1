import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../Service/api'
import { MaestroCuentas } from '../../Modelos/MaestroCuentas';
import { MovtoCreditos } from "../../Modelos/MovtoCreditos";
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { useContextUsuario } from '../../Context/Provider';

export default function PrestamosComponent() {
  const [descripcion_producto, setDescripcion_producto] = useState<string>('');
  const [saldo_total, setSaldo_total] = useState<Float>(0)
  const [estatus_producto, setEstatus_producto] = useState<string>('')
  const [id, setId] = useState<number>(0)
  const [detalles, setDetalles] = useState([]);
  const [mpc, setMpc] = useState<number>(0); 
  const [prestamos, setPrestamos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cod_cliente } = useContextUsuario();

  const getPrestamos = async () => {
    try {
      setLoading(true);
      const response = await api.get('MaestroCuentas');
      const filtrarProducto = response.data.filter(
        (item: MaestroCuentas) => item.modulo_producto_cliente === 'PRESTAMOS' && item.cod_cliente === cod_cliente
      );
      setPrestamos(filtrarProducto);
      console.log('datos de prestamos', filtrarProducto);
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cargar los préstamos: ' + error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPrestamos()
  }, [])

  const getDetalles = async (nroProducto: number) => {
    try {
      setLoading(true);
      const response = await api.get("MovtoCreditos");
      
      const filtrarProducto = response.data.filter(
        (item: MovtoCreditos) => item.codigo_de_credito === nroProducto 
      );
      setDetalles(filtrarProducto);
      console.log('datos de la tabla movto_creditos', filtrarProducto);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al cargar los movimientos: " + error);
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (nroProducto: number) => {
    setMpc(nroProducto); 
    getDetalles(nroProducto); 
    setModalVisible(true); 
  };

  const formatCurrency = (amount: number) => {
    return `L. ${amount.toLocaleString('es-HN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-HN');
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVO':
        return '#10b981';
      case 'VIGENTE':
        return '#10b981';
      case 'MORA':
        return '#ef4444';
      case 'VENCIDO':
        return '#dc2626';
      case 'CANCELADO':
        return '#6b7280';
      default:
        return '#f59e0b';
    }
  };

  const renderPrestamoItem = ({ item }: { item: MaestroCuentas }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.productTitle}>{item.descripcion_producto}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.estatus_producto) }]}>
          <Text style={styles.statusText}>{item.estatus_producto}</Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo pendiente</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(item.saldo_total)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={() => abrirModal(item.nro_producto_cliente)}
      >
        <Text style={styles.detailsButtonText}>Ver pagos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMovimientoItem = ({ item }: { item: MovtoCreditos }) => (
    <View style={styles.movementCard}>
      <View style={styles.movementHeader}>
        <Text style={styles.movementType}>Pago de Cuota</Text>
        <Text style={styles.movementDate}>{formatDate(item.fecha_movimiento.toString())}</Text>
      </View>
      
      <View style={styles.movementDetails}>
        <View style={styles.movementRow}>
          <Text style={styles.movementLabel}>Referencia:</Text>
          <Text style={styles.movementValue}>{item.numero_de_referencia}</Text>
        </View>
        
        <View style={styles.movementRow}>
          <Text style={styles.movementLabel}>Valor total:</Text>
          <Text style={[styles.movementValue, { color: '#10b981' }]}>
            {formatCurrency(item.valor_mvto)}
          </Text>
        </View>

        <View style={styles.paymentBreakdown}>
          <Text style={styles.breakdownTitle}>Distribución del pago:</Text>
          
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Capital:</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(item.aplicado_capital)}</Text>
          </View>
          
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Intereses:</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(item.aplicado_intereses)}</Text>
          </View>
          
          {item.aplicado_mora > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Mora:</Text>
              <Text style={[styles.breakdownValue, { color: '#ef4444' }]}>
                {formatCurrency(item.aplicado_mora)}
              </Text>
            </View>
          )}
          
          {item.aplicado_seguros > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Seguros:</Text>
              <Text style={styles.breakdownValue}>{formatCurrency(item.aplicado_seguros)}</Text>
            </View>
          )}
          
          {item.aplicado_otros > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Otros:</Text>
              <Text style={styles.breakdownValue}>{formatCurrency(item.aplicado_otros)}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.movementRow}>
          <Text style={styles.movementLabel}>Nuevo saldo capital:</Text>
          <Text style={styles.movementValue}>{formatCurrency(item.saldo_posterior_capital)}</Text>
        </View>
      </View>
    </View>
  );

  if (loading && prestamos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando préstamos...</Text>
      </View>
    );
  }

  if (prestamos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes préstamos registrados</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={getPrestamos}>
          <Text style={styles.refreshButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={prestamos}
        keyExtractor={(item: MaestroCuentas) => item.id.toString()}
        renderItem={renderPrestamoItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true} 
        visible={modalVisible} 
        onRequestClose={() => setModalVisible(false)} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Historial de Pagos</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {detalles.length > 0 ? (
                <FlatList
                  data={detalles}
                  keyExtractor={(item: MovtoCreditos) => item.id.toString()}
                  renderItem={renderMovimientoItem}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.noMovementsContainer}>
                  <Text style={styles.noMovementsText}>No hay pagos para mostrar</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d3748',
  },
  detailsButton: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#718096',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#d97706',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    maxHeight: '80%',
    width: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#718096',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  movementCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#d97706',
  },
  movementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  movementType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  movementDate: {
    fontSize: 14,
    color: '#718096',
  },
  movementDetails: {
    gap: 8,
  },
  movementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movementLabel: {
    fontSize: 14,
    color: '#718096',
  },
  movementValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
  },
  paymentBreakdown: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#718096',
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2d3748',
  },
  noMovementsContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMovementsText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
});