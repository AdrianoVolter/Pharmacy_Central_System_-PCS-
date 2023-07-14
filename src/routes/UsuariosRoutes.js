const express = require('express');
const routes = express.Router();
const UsuarioConroller = require('../controllers/UsuarioController')
const {auth} = require('../middleware/auth')


routes.get('/usuarios', UsuarioConroller.listarUsuarios)
routes.post('/usuarios', UsuarioConroller.criarUsuario)
routes.post('/usuarios/login', UsuarioConroller.loginUsario)
routes.patch('/usuarios/:id', auth , UsuarioConroller.atualizarUsuario)
routes.patch('/usuarios/:id/status', auth , UsuarioConroller.atualizarStatusUsuario)
routes.get('/usuarios/:id', auth , UsuarioConroller.listarUsuario)
routes.patch('/usuarios/:id/senha', auth , UsuarioConroller.atualizarSenhaUsuario)


module.exports= routes