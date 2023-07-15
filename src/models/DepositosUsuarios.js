const {INTEGER, STRING, DATE, ENUM} = require('sequelize')
const  connection  = require('../database/connection')
const Depositos = require('./Depositos')
const Usuarios = require('./Usuarios')

const DepositosUsuarios = connection.define('depositos_usuarios', {
    id_depositos:{
        type:INTEGER,
        references:{
          model:{
            tableName:'depositos'
          },
          key:'id'
        },
        allowNull:false
      },
    id_usuarios:{
        type:INTEGER,
        references:{
          model:{
            tableName:'usuarios'
          },
          key:'id'
        },
        allowNull:false
    },
    createdAt: {
        type: DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
    },
    deleted_at: {
        type: DATE,
        allowNull: true,
    }
})

  Usuarios.belongsToMany(Depositos, { through: DepositosUsuarios, foreignKey: 'id_usuarios' })
  Depositos.belongsToMany(Usuarios, { through: DepositosUsuarios, foreignKey: 'id_depositos' })

module.exports = DepositosUsuarios;
