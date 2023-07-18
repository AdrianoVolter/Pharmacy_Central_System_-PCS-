const express = require('express');
const routes = express.Router();
const MedicamentoController = require('../controllers/MedicamentoController');
const {validarToken} = require('../middleware/auth')


routes.post('/medicamentos', validarToken, MedicamentoController.cadastroMedicamento);
routes.patch('/medicamentos/:id', validarToken, MedicamentoController.atualizarMedicamento);

module.exports = routes;
