import { createContext } from "react";

export const contextousuario = createContext({
    nombre:'',
    identidad:'',
    setNombre: (nombre: string) =>{},
    setIdentidad: (identidad: string) =>{},
    id:0,
    setID: (id:number)=>{},
    regresarPerfil:false,
    setRegresarPerfil: (regresarPerfil:boolean) =>{},
    cod_cliente:0,
    setCod_cliente:(cod_cliente:number)=>{},
    nro_producto_cliente:0,
    setNro_producto_cliente:(nro_producto_cliente:number)=>{}

})
