const express = require('express')
const routes = express.Router()

const UsuariosRoutes = require('./UsuariosRoutes')
const DepositosRoutes = require('./DepositosRoutes')
const MedicamentosRoutes = require('./MedicamentosRoutes')

routes.use('/api',UsuariosRoutes)
routes.use('/api',DepositosRoutes)
routes.use('/api',MedicamentosRoutes)

module.exports = routes
