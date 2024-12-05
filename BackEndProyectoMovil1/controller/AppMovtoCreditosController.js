const MovtoCreditos = require('../modelos/MovtoCreditos');

exports.getMovtoCreditos = async (req, res) => {
    try {
        const movimientos = await MovtoCreditos.findAll();
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener movimientos de créditos' });
    }
};

exports.getMovtoCreditosById = async (req, res) => {
    const { id } = req.params;
    try {
        const movimiento = await MovtoCreditos.findByPk(id);
        if (!movimiento) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener movimiento por ID' });
    }
};
