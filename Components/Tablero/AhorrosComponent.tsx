import { View, Text, Alert, FlatList ,StyleSheet, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ahorros } from '../../Modelos/Ahorros';

export default function AhorrosComponent() {
    const [descripcion, setDescripcion]= useState<string>('');
  const [saldoTotal, serSaldoTotal] = useState<string> ('')
  const [estado, setEstado]= useState<string> ('')

  const [ahorros, setAhorros]= useState([]);


  const getAhorros = async () =>{
    try {
        
        //const response= await api.get('ahorros');
        //setAhorros(response.data)

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
      keyExtractor={(item:Ahorros) => item.idAhorro.toString()}
      renderItem={({item})=>(
        
        <View style={styles.card}>
            <Text>Producto{ `${item.descripcion}`}</Text>
            <Text>L. {item.saldoTotal}</Text>
            <Text>Estado {item.estado} </Text>
            <View style={styles.actions}>
                <Button title='Detalles' onPress={()=>{}}></Button>
            </View>
            <Text>----------</Text>
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
    card: {
      //backgroundColor: '#fff',
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
