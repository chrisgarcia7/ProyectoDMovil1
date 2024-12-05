const express = require('express');
const router = express.Router();
const { 
    getMovtoAhorros, 
    getMovtoAhorrosById 
} = require('../controller/AppMovtoAhorrosController');

router.get('/', getMovtoAhorros); 
router.get('/:id', getMovtoAhorrosById); 

module.exports = router;
