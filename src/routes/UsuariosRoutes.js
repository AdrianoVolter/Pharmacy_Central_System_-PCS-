const express = require('express');
const routes = express.Router();
const UsuarioConroller = require('../controllers/UsuarioController')


routes.get('/usuarios', UsuarioConroller.listarUsuarios)


module.exports= routes