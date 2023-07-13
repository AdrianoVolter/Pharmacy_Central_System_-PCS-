const express = require('express')
const routes = express.Router()

const UsuariosRoutes = require('./UsuariosRoutes')

routes.use('/api',UsuariosRoutes)




module.exports = routes
