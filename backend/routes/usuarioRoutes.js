const express = require('express');
const router = express.Router();
import usuarioController from '../controllers/usuarioController.js';


router.post('/usuario', usuarioController.criar); 
router.get('/usuario', usuarioController.mostrar);

module.exports = router;