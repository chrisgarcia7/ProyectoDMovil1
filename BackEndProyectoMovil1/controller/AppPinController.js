const AppPin = require('../modelos/AppPin');

exports.getAppPins = async (req, res) => {
    try {
        const pins = await AppPin.findAll();
        res.json(pins);
    } catch (error) {
    }
};

exports.getAppPinById = async (req, res) => {
    const { id } = req.params;
    try {
        const pin = await AppPin.findByPk(id);
        if (!pin) {
        }
        res.json(pin);
    } catch (error) {
    }
};

exports.login = async (req,res) =>{
    const { celular, pindb } = req.body;
    
    try {
        
        const pinRegistro = await AppPin.findOne({ where: { nro_de_celular: celular, pin: pindb } });

        if (!pinRegistro) {
        }

        res.status(200).json({
            nombreres: pinRegistro.nombre_de_cliente,
            identidadres: pinRegistro.nro_identidad,
            idres: pinRegistro.id,
            codigo_clienteres: pinRegistro.cod_cliente,
        });
    } catch (error) {
    }
};

exports.putPin = async (req,resp) =>{
    const {id, oldPIN, newPIN } = req.body;
    try {

        const usuario = await AppPin.findOne({ where: { id: id, pin: oldPIN } });

        if (!usuario){
        }else{
            await usuario.update({pin: newPIN});
            resp.status(200).send("actualizado correctamente")


        }
        
    } catch (error) {
        
    }
}