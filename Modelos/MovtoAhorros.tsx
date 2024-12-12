import { Double, Float } from "react-native/Libraries/Types/CodegenTypes"

export interface MovtoAhorros{
    id: number
    oficina_cliente: number
    cod_cliente: number
    nro_producto_cliente: number
    tipo_movimiento: number
    numero_de_referencia: number
    fecha_movimiento: Date
    saldo_anterior: Float
    valor_mvto: Float
    saldo_posterior: Float
    estatus_mvto: string
}