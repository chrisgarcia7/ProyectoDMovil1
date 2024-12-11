import { View, Text, Alert, FlatList ,StyleSheet, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../Service/api'
import { MaestroCuentas } from '../../Modelos/MaestroCuentas';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { useContextUsuario } from '../../Context/Provider';


export default function AhorrosComponent() {
  const [descripcion_producto, setDescripcion_producto]= useState<string>('');
  const [saldo_total, setSaldo_total] = useState<Float> (0)
  const [estatus_producto, setEstatus_producto]= useState<string> ('')
  const [id, setId] = useState<number> (0)
  const [ahorros, setAhorros]= useState([]);

  const {cod_cliente} = useContextUsuario()  

  const getAhorros = async () =>{
    
    try {
      
        const response= await api.get('MaestroCuentas');
        const filtrarProducto = response.data.filter(
          (item: MaestroCuentas) => item.modulo_producto_cliente === 'AHORROS' && item.cod_cliente === cod_cliente
        );
        setAhorros(filtrarProducto);

    } catch (error) {
        Alert.alert('Error', 'Ocurrio un error' + error)
    }
  }

  useEffect(()=>{
        getAhorros()
  }, [])

  return (
    <View style={styles.container}>
      
    <FlatList 
      data={ahorros}
      keyExtractor={(item:MaestroCuentas) => item.id.toString()}
      renderItem={({item})=>(
        
        <View style={styles.cardAhorros}>
            <Text>Producto: { item.descripcion_producto}</Text>
            <Text>Saldo Actual: L. {item.saldo_total}</Text>
            <Text>Estado: {item.estatus_producto} </Text>
            <View style={styles.actions}>
                <Button title='Detalles' onPress={()=>{}}></Button>
            </View>
           
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
    cardAhorros: {
      backgroundColor: '#abcf6b',
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
  });
