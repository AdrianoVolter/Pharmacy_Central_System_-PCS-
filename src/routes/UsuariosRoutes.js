const express = require('express');
const routes = express.Router();
const UsuarioConroller = require('../controllers/UsuarioController')


routes.get('/usuarios', UsuarioConroller.listarUsuarios)
routes.post('/usuarios', UsuarioConroller.criarUsuario)


module.exports= routes