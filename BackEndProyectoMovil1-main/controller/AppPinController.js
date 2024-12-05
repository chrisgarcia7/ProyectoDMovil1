const AppPin = require('../modelos/AppPin');

exports.getAppPins = async (req, res) => {
    try {
        const pins = await AppPin.findAll();
        res.json(pins);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener registros de PIN' });
    }
};

exports.getAppPinById = async (req, res) => {
    const { id } = req.params;
    try {
        const pin = await AppPin.findByPk(id);
        if (!pin) {
            return res.status(404).json({ error: 'Registro de PIN no encontrado' });
        }
        res.json(pin);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener registro de PIN por ID' });
    }
};

exports.login = async (req,res) =>{
    const { celular, pindb } = req.body;
    
    try {
        
        const pinRegistro = await AppPin.findOne({ where: { nro_de_celular: celular, pin: pindb } });

        if (!pinRegistro) {
            return res.status(404).json({ error: 'Credenciales incorrectas' });
        }

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            nombreres: pinRegistro.nombre_de_cliente,
            identidadres: pinRegistro.nro_identidad,
            idres: pinRegistro.id

        });
    } catch (error) {
        res.status(500).json({ error: 'Error en la autenticación' });
    }
};

exports.putPin = async (req,resp) =>{
    const {id, oldPIN, newPIN } = req.body;
    try {

        const usuario = await AppPin.findOne({ where: { id: id, pin: oldPIN } });

        if (!usuario){
            resp.status(402).send("No se encontro registro");

        }else{
            await usuario.update({pin: newPIN});
          resp.status(200).send("actualizado correctamente")


        }
        
    } catch (error) {
        resp.status(500).json({error: 'Ocurrio un error' + error})
        
    }
}