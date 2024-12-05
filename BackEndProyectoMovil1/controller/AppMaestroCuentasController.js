const MaestroCuentas = require('../modelos/MaestroCuentas');

exports.getMaestroCuentas = async (req, res) => {
    try {
        const cuentas = await MaestroCuentas.findAll();
        res.json(cuentas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener maestro de cuentas' });
    }
};

exports.getMaestroCuentaById = async (req, res) => {
    const { id } = req.params;
    try {
        const cuenta = await MaestroCuentas.findByPk(id);
        if (!cuenta) {
            return res.status(404).json({ error: 'Cuenta no encontrada' });
        }
        res.json(cuenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cuenta por ID' });
    }
};
