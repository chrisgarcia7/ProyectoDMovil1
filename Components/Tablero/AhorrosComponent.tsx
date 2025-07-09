import {  View,  Text,  Alert,  FlatList,  StyleSheet,  TouchableOpacity,  Modal, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../Service/api";
import { MaestroCuentas } from "../../Modelos/MaestroCuentas";
import { MovtoAhorros } from "../../Modelos/MovtoAhorros";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { useContextUsuario } from "../../Context/Provider";
import MovtoAhorros from "../../BackEndProyectoMovil1/modelos/MovtoAhorros";

export default function AhorrosComponent() {
  const [descripcion_producto, setDescripcion_producto] = useState<string>("");
  const [saldo_total, setSaldo_total] = useState<Float>(0);
  const [estatus_producto, setEstatus_producto] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [ahorros, setAhorros] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [mpc, setMpc] = useState<number>(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cod_cliente } = useContextUsuario();

  const getAhorros = async () => {
    try {
      setLoading(true);
      const response = await api.get("MaestroCuentas");
      const filtrarProducto = response.data.filter(
        (item: MaestroCuentas) => 
          item.modulo_producto_cliente === "AHORROS" && 
          item.cod_cliente === cod_cliente
      );
      setAhorros(filtrarProducto);
      console.log('datos de la tabla maestro cuentas', filtrarProducto);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al cargar los datos: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAhorros();
  }, []);

  const getDetalles = async (nroProducto: number) => {
    try {
      setLoading(true);
      const response = await api.get("MovtoAhorros");
      
      const filtrarProducto = response.data.filter(
        (item: MovtoAhorros) => item.nro_producto_cliente === nroProducto 
      );
      setDetalles(filtrarProducto);
      console.log('datos de la tabla app_movto_ahorros', filtrarProducto);
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

  const obtenerNombreMovimiento = (tipoMovimiento: number) => {
    switch (tipoMovimiento) {
      case 1:
        return 'Depósito';
      case 2:
        return 'Pago de Intereses';
      case 3:
        return 'Nota de Débito';
      case 10:
        return 'Retiro';
      case 13:
        return 'Nota de Crédito';
      default:        
        return 'Otro Movimiento';
    }
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
      case 'ACTIVA':
        return '#10b981';
      case 'VIGENTE':
        return '#10b981';
      case 'INACTIVA':
        return '#ef4444';
      case 'BLOQUEADA':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const renderAhorroItem = ({ item }: { item: MaestroCuentas }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.productTitle}>{item.descripcion_producto}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.estatus_producto) }]}>
          <Text style={styles.statusText}>{item.estatus_producto}</Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo disponible</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(item.saldo_total)}</Text>
      </View>

      <TouchableOpacity 
        style={styles.detailsButton}
        onPress={() => abrirModal(item.nro_producto_cliente)}
      >
        <Text style={styles.detailsButtonText}>Ver movimientos</Text>
      </TouchableOpacity>
    </View>
  );

  const renderMovimientoItem = ({ item }: { item: MovtoAhorros }) => (
    <View style={styles.movementCard}>
      <View style={styles.movementHeader}>
        <Text style={styles.movementType}>{obtenerNombreMovimiento(item.tipo_movimiento)}</Text>
        <Text style={styles.movementDate}>{formatDate(item.fecha_movimiento.toString())}</Text>
      </View>
      
      <View style={styles.movementDetails}>
        <View style={styles.movementRow}>
          <Text style={styles.movementLabel}>Referencia:</Text>
          <Text style={styles.movementValue}>{item.numero_de_referencia}</Text>
        </View>
        
        <View style={styles.movementRow}>
          <Text style={styles.movementLabel}>Valor:</Text>
          <Text style={[styles.movementValue, { 
            color: item.tipo_movimiento === 1 ? '#10b981' : '#ef4444' 
          }]}>
            {formatCurrency(item.valor_mvto)}
          </Text>
        </View>
        
        <View style={styles.movementRow}>
          <Text style={styles.movementLabel}>Saldo posterior:</Text>
          <Text style={styles.movementValue}>{formatCurrency(item.saldo_posterior)}</Text>
        </View>
      </View>
    </View>
  );

  if (loading && ahorros.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando cuentas de ahorro...</Text>
      </View>
    );
  }

  if (ahorros.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes cuentas de ahorro registradas</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={getAhorros}>
          <Text style={styles.refreshButtonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ahorros}
        keyExtractor={(item: MaestroCuentas) => item.id.toString()}
        renderItem={renderAhorroItem}
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
              <Text style={styles.modalTitle}>Movimientos de Cuenta</Text>
              
            
              
              <Text>{}</Text>
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
                  keyExtractor={(item: MovtoAhorros) => item.id.toString()}
                  renderItem={renderMovimientoItem}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.noMovementsContainer}>
                  <Text style={styles.noMovementsText}>No hay movimientos para mostrar</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
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
    borderLeftColor: '#10b981',
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
    backgroundColor: '#3182ce',
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
    backgroundColor: '#3182ce',
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
    borderLeftColor: '#3182ce',
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