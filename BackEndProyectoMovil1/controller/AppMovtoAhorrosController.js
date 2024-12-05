const MovtoAhorros = require('../modelos/MovtoAhorros');

exports.getMovtoAhorros = async (req, res) => {
    try {
        const movimientos = await MovtoAhorros.findAll();
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener movimientos de ahorros' });
    }
};

exports.getMovtoAhorrosById = async (req, res) => {
    const { id } = req.params;
    try {
        const movimiento = await MovtoAhorros.findByPk(id);
        if (!movimiento) {
            return res.status(404).json({ error: 'Movimiento no encontrado' });
        }
        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener movimiento por ID' });
    }
};
