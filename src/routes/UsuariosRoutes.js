const express = require('express');
const routes = express.Router();
const UsuarioConroller = require('../controllers/UsuarioController')
const {auth} = require('../middleware/auth')


routes.get('/usuarios', UsuarioConroller.listarUsuarios)
routes.post('/usuarios', UsuarioConroller.criarUsuario)
routes.post('/usuarios/login', UsuarioConroller.loginUsario)
routes.patch('/usuarios/:id', auth , UsuarioConroller.atualizarUsuario)


module.exports= routes