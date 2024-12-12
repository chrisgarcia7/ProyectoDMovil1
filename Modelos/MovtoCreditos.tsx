import { Double, Float } from "react-native/Libraries/Types/CodegenTypes"

export interface MovtoCreditos{
    id: number
    oficina_cliente: number
    cod_cliente: number
    codigo_de_credito: number
    tipo_movimiento: number
    numero_de_referencia: number
    fecha_movimiento: Date
    valor_mvto: Float
    aplicado_capital: Float
    aplicado_intereses: Float
    aplicado_mora: Float
    aplicado_seguros: Float
    aplicado_otros: Float
    aplicado_cuenta_x_pagar: number
    saldo_posterior_capital: Float
    estatus_mvto: string

}