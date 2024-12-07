import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useState, useEffect } from 'react'
import { contextousuario } from './Context'

interface ViewReact{
    children: ReactNode
}

export default function Provider({children}: ViewReact) {
    const[nombre, setNombre]=useState<string>('');
    const[identidad,setIdentidad]=useState<string>('');
    const[id,setID]=useState<number>(0);
    const[regresarPerfil, setRegresarPerfil]=useState<boolean>(false);

    const[cod_cliente, setCod_cliente]=useState<number>(0);
    const[nro_producto_cliente,setNro_producto_cliente]=useState<number>(0);


    
  return (
    <contextousuario.Provider value={{
        nombre,
        setNombre,
        identidad,
        setIdentidad,
        id,
        setID,
        regresarPerfil,
        setRegresarPerfil,
        cod_cliente,
        setCod_cliente,
        nro_producto_cliente,
        setNro_producto_cliente
    }}>
        {children}
    </contextousuario.Provider>
  )
}

export const useContextUsuario =() =>{
    return useContext(contextousuario)
}