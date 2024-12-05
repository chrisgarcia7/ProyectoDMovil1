const express = require('express');
const router = express.Router();
const { 
    getMovtoCreditos, 
    getMovtoCreditosById 
} = require('../controller/AppMovtoCreditosController');

router.get('/', getMovtoCreditos); 
router.get('/:id', getMovtoCreditosById);

module.exports = router;
