import { View, Text, Alert, FlatList ,StyleSheet, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Prestamos } from '../../Modelos/Prestamos';

export default function PrestamosComponent() {
    const [descripcion, setDescripcion]= useState<string>('');
    const [saldoTotal, serSaldoTotal] = useState<string> ('')
    const [estado, setEstado]= useState<string> ('')

  const [prestamos, setPrestamos]= useState([]);


  const getPrestamos = async () =>{
    try {
        
        //const response= await api.get('prestamos');
        //setPrestamos(response.data)

    } catch (error) {
        Alert.alert('Error', 'Ocurrio un error' + error)
    }
  }

  useEffect(()=>{
        getPrestamos()
  }, [])

  return (
    <View style={styles.container}>
      
    <FlatList 
      data={prestamos}
      keyExtractor={(item:Prestamos) => item.idPrestamo.toString()}
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
      backgroundColor: '#ffff',
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
