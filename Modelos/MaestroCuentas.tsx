import { Double, Float } from "react-native/Libraries/Types/CodegenTypes"

export interface MaestroCuentas{
    id: number
    oficina_cliente: number
    cod_cliente: number
    modulo_producto_cliente: string
    nro_producto_cliente: number
    descripcion_producto: number
    tasa_producto: Float
    saldo_total: Float
    fecha_ultimo_movimiento: Date
    fecha_otorgado: Date
    fecha_vencimiento: Date
    monto_otorgado: Float
    saldo_capital: Float
    saldo_intereses: Float
    saldo_mora: Float
    saldo_seguros: Float
    saldo_otros: Float
    valor_cuota: Float
    estatus_producto: string

}



