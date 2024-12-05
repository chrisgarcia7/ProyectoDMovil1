import { View, Text } from 'react-native'
import React, { ReactNode, useContext, useState } from 'react'
import { contextousuario } from './Context'

interface ViewReact{
    children: ReactNode
}

export default function Provider({children}: ViewReact) {
    const[nombre, setNombre]=useState<string>('');
    const[identidad,setIdentidad]=useState<string>('');
    const[id,setID]=useState<number>(0);
    const[regresarPerfil, setRegresarPerfil]=useState<boolean>(false);
  return (
    <contextousuario.Provider value={{
        nombre,
        setNombre,
        identidad,
        setIdentidad,
        id,
        setID,
        regresarPerfil,
        setRegresarPerfil
    }}>
        {children}
    </contextousuario.Provider>
  )
}

export const useContextUsuario =() =>{
    return useContext(contextousuario)
}