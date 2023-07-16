const express = require('express');
const routes = express.Router();
const DepositoController = require('../controllers/DepositoController')
const {validarToken} = require('../middleware/auth')

routes.get('/depositos', DepositoController.listarDepositos) //lista todos os depositos , rota de teste
routes.post('/depositos', validarToken , DepositoController.criarDeposito)
routes.patch('/depositos/:id', validarToken , DepositoController.atualizarDeposito)
routes.patch('/depositos/:id/status', validarToken , DepositoController.atualizarStatusDeposito)

module.exports = routes
