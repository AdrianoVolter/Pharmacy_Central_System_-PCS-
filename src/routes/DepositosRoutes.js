const express = require('express');
const routes = express.Router();
const DepositoController = require('../controllers/DepositoController')
const {auth} = require('../middleware/auth')


routes.post('/depositos', auth , DepositoController.criarDeposito)

module.exports = routes
