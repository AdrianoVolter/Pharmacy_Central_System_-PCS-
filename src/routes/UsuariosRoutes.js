const express = require('express');
const routes = express.Router();
const UsuarioConroller = require('../controllers/UsuarioController')
const {validarToken} = require('../middleware/auth')

routes.post('/usuarios', UsuarioConroller.criarUsuario)
routes.post('/usuarios/login', UsuarioConroller.loginUsario)
routes.patch('/usuarios/:id', validarToken, UsuarioConroller.atualizarUsuario)
routes.patch('/usuarios/:id/status', validarToken , UsuarioConroller.atualizarStatusUsuario)
routes.get('/usuarios/:id', validarToken , UsuarioConroller.listarUsuario)
routes.patch('/usuarios/:id/senha', validarToken , UsuarioConroller.atualizarSenhaUsuario)


module.exports= routes
