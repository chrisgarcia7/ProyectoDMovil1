import { createContext } from "react";

export const contextousuario = createContext({
    nombre:'',
    identidad:'',
    setNombre: (nombre: string) =>{},
    setIdentidad: (identidad: string) =>{},
    id:0,
    setID: (id:number)=>{},
    regresarPerfil:false,
    setRegresarPerfil: (regresarPerfil:boolean) =>{}
})