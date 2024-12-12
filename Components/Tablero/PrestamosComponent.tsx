import { View, Text, Alert, FlatList ,StyleSheet, Button, Modal} from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../Service/api'
import { MaestroCuentas } from '../../Modelos/MaestroCuentas';
import { MovtoCreditos } from "../../Modelos/MovtoCreditos";
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { useContextUsuario } from '../../Context/Provider';

export default function PrestamosComponent() {
  const [descripcion_producto, setDescripcion_producto]= useState<string>('');
  const [saldo_total, setSaldo_total] = useState<Float> (0)
  const [estatus_producto, setEstatus_producto]= useState<string> ('')
  const [id, setId] = useState<number> (0)
  const [detalles, setDetalles] = useState([]);
  const [mpc, setMpc] = useState<number>(0); 

  const [prestamos, setPrestamos]= useState([]);

    const [modalVisible, setModalVisible] = useState(false); 
  

  const {cod_cliente} = useContextUsuario()  


  const getPrestamos = async () =>{
    try {
        
        const response= await api.get('MaestroCuentas');
        const filtrarProducto = response.data.filter(
          (item: MaestroCuentas) => item.modulo_producto_cliente === 'PRESTAMOS' && item.cod_cliente === cod_cliente
        );
        setPrestamos(filtrarProducto);

    } catch (error) {
        Alert.alert('Error', 'Ocurrio un error' + error)
    }
  }

  useEffect(()=>{
        getPrestamos()
  }, [])


  const getDetalles = async (nroProducto: number) => {
    try {
      const response = await api.get("MovtoCreditos");
      
      const filtrarProducto = response.data.filter(
        (item: MovtoCreditos) => item.codigo_de_credito === nroProducto 
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




  return (
    <View style={styles.container}>
      
    <FlatList 
      data={prestamos}
      keyExtractor={(item:MaestroCuentas) => item.id.toString()}
      renderItem={({item})=>(
        
        <View style={styles.cardPrestamos}>
            <Text>Producto: { item.descripcion_producto}</Text>
            <Text>Saldo Actual L. {item.saldo_total}</Text>
            <Text>Estado: {item.estatus_producto} </Text>
             <View style={styles.actions}>
                  <Button title='Detalles' onPress={() => abrirModal(item.nro_producto_cliente)} ></Button>
              </View>
            <Modal
                    animationType="slide"
                    transparent={true} 
                    visible={modalVisible} 
                    onRequestClose={() => setModalVisible(false)} 
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTextTitle}>Detalles del Producto: {mpc} 🎉</Text>

                        <FlatList
                                            data={detalles}
                                            keyExtractor={(item: MovtoCreditos) => item.id.toString()}
                                            renderItem={({ item }) => (
                                              <View style={styles.cardDetalles}>
                                                <Text>Movimiento: {item.tipo_movimiento}</Text>
                                                <Text>N. Recibo {item.numero_de_referencia}</Text>
                                                <Text>Fecha Movimiento: {item.fecha_movimiento.toString()}</Text>
                                                <Text>Valor Movimiento: L.  {item.valor_mvto}</Text>
                                                <Text>Aplicado Capital: L.  {item.aplicado_capital}</Text>
                                                <Text>Aplicado Intereses: L.  {item.aplicado_intereses}</Text>
                                                <Text>Aplicado Mora: L.  {item.aplicado_mora}</Text>
                                                <Text>Aplicado Seguros: L.  {item.aplicado_seguros}</Text>
                                                <Text>Aplicado Otros: L.  {item.aplicado_otros}</Text>
                                                <Text>Aplicado CXP: L.  {item.aplicado_cuenta_x_pagar}</Text>
                                                <Text>Nuevo Capital: L.  {item.saldo_posterior_capital}</Text>
                                                <Text>Estado:  {item.estatus_mvto}</Text>
                                              </View>
                                            )}
                                          />
            
                        {/* Botón para cerrar el modal */}
                        <Button 
                          title="Cerrar Modal" 
                          onPress={() => setModalVisible(false)} 
                        />
                      </View>
                    </View>
                  </Modal>
           
        </View>
       
      )}

      >


    </FlatList>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f4f4f4',
      marginTop:10
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 8,
      borderRadius: 4,
    },
    cardPrestamos: {
      backgroundColor: '#c58a90',
      padding: 16,
      marginBottom: 8,
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      marginTop:5
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    cardDetalles: {
      backgroundColor: "rgba(231, 183, 183, 0.89)",
      padding: 10,
      marginBottom: 8,
      borderRadius: 4,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "rgba(101, 7, 7, 0.26)", 
    },
    modalContent: {
      width: 300,
      maxHeight: '95%',
      marginTop: 10,
      padding: 20,
      backgroundColor: "rgba(0, 0, 0, 0.73)",
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
      textAlign: 'center',
    },
    modalTextTitle: {
      fontSize: 18,
      color: "white",
      marginBottom: 15,
      textAlign: "center",
    },
  });
