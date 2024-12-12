import {  View,  Text,  Alert,  FlatList,  StyleSheet,  Button,  Modal,} from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../Service/api";
import { MaestroCuentas } from "../../Modelos/MaestroCuentas";
import { MovtoAhorros } from "../../Modelos/MovtoAhorros";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { useContextUsuario } from "../../Context/Provider";

export default function AhorrosComponent() {
  const [descripcion_producto, setDescripcion_producto] = useState<string>("");
  const [saldo_total, setSaldo_total] = useState<Float>(0);
  const [estatus_producto, setEstatus_producto] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [ahorros, setAhorros] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [mpc, setMpc] = useState<number>(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const { cod_cliente } = useContextUsuario();

  const getAhorros = async () => {
    try {
      const response = await api.get("MaestroCuentas");
      const filtrarProducto = response.data.filter(
        (item: MaestroCuentas) => 
          item.modulo_producto_cliente === "AHORROS" && 
          item.cod_cliente === cod_cliente
      );
      setAhorros(filtrarProducto);
      console.log('datos de la tabla maestro cuentas', filtrarProducto);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error: " + error);
    }
  };

  useEffect(() => {
    getAhorros();
  }, []);

  ///////////////
  const getDetalles = async (nroProducto: number) => {
    try {
      const response = await api.get("MovtoAhorros");
      
      const filtrarProducto = response.data.filter(
        (item: MovtoAhorros) => item.nro_producto_cliente === nroProducto 
      );
      setDetalles(filtrarProducto);
      console.log('datos de la tabla app_movto_ahorros', filtrarProducto);
     
      
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error: " + error);
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
        return 'Pago Intereses';
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

  return (
    <View style={styles.container}>
      <FlatList
        data={ahorros}
        keyExtractor={(item: MaestroCuentas) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardAhorros}>
            <Text>Producto: {item.descripcion_producto}</Text>
            <Text>Saldo Actual: L. {item.saldo_total}</Text>
            <Text>Estado: {item.estatus_producto} </Text>
            <View style={styles.actions}>
              <Button
                title="Detalles"
                onPress={() => abrirModal(item.nro_producto_cliente)} 
              />
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTextTitle}>Detalles del producto: {mpc} 🎉</Text>

                  <FlatList
                    data={detalles}
                    keyExtractor={(item: MovtoAhorros) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.cardDetalles}>
                        <Text>Movimiento: {obtenerNombreMovimiento(item.tipo_movimiento)}</Text>
                        <Text>N. Recibo {item.numero_de_referencia}</Text>
                        <Text>Fecha Movimiento: {item.fecha_movimiento.toString()}</Text>
                        <Text>Saldo Anterior: L.  {item.saldo_anterior}</Text>
                        <Text>Valor Movimiento: L.  {item.valor_mvto}</Text>
                        <Text>Saldo Posterior: L.  {item.saldo_posterior}</Text>
                        <Text>Estado:  {item.estatus_mvto}</Text>
                      </View>
                    )}
                  />

                  <Button
                    title="Cerrar Modal"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  cardAhorros: {
    backgroundColor: "#abcf6b",
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
  cardDetalles: {
    backgroundColor: "#d4edda",
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(12, 47, 42, 0.5)", 
  },
  modalContent: {
    width: 300,
    maxHeight: '95%',
    marginTop: 10,
    padding: 20,
    backgroundColor: "rgba(12, 47, 42, 0.86)",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalTextTitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 15,
    textAlign: "center",
  },
});
