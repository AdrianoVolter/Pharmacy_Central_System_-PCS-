const express = require('express');
const routes = express.Router();
const UsuarioLogadoController = require('../controllers/UsuarioLogadoController')
const {validarToken} = require('../middleware/auth')
//usuario logado na rotas



routes.get('/usuariologado', validarToken, UsuarioLogadoController.listarUsuarioLogado)

module.exports = routes
