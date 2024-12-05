const express = require('express');
const router = express.Router();
const { 
    getAppPins, 
    getAppPinById,
    login,
    putPin
} = require('../controller/AppPinController');

router.get('/', getAppPins); 
router.get('/:id', getAppPinById); 
router.post('/',login);
router.put('/:id',putPin);

module.exports = router;
