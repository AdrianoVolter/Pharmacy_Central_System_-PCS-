const express = require('express');
const routes = express.Router();
const DepositoController = require('../controllers/DepositoController')
const {validarToken} = require('../middleware/auth')


routes.post('/depositos', validarToken , DepositoController.criarDeposito)

module.exports = routes
