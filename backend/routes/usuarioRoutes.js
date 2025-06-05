import express from 'express';
import usuarioController from '../src/controller/Usuario.js';

const router = express.Router();

router.post('/usuario', usuarioController.criar); 
router.get('/usuario', usuarioController.mostrar);

export default router;