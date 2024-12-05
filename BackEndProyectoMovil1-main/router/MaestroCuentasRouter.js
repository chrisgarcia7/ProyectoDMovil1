const express = require('express');
const router = express.Router();
const { 
    getMaestroCuentas, 
    getMaestroCuentaById 
} = require('../controller/AppMaestroCuentasController');

router.get('/', getMaestroCuentas); 
router.get('/:id', getMaestroCuentaById); 

module.exports = router;
