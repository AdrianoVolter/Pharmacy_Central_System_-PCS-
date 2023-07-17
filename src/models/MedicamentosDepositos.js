const {INTEGER, STRING, DATE, ENUM} = require('sequelize')
const  connection  = require('../database/connection')
const Medicamentos = require('./Medicamentos')
const Depositos = require('./Depositos')


const MedicamentosDepositos = connection.define('medicamentos_depositos', {
    id_medicamentos:{
        type:INTEGER,
        references:{
        model:{
            tableName:'medicamentos'
        },
        key:'id'
        },
        allowNull:false
    },
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
 
Medicamentos.belongsToMany(Depositos, { through: MedicamentosDepositos, foreignKey: 'id_medicamentos' })
Depositos.belongsToMany(Medicamentos, { through: MedicamentosDepositos, foreignKey: 'id_depositos' })

module.exports = MedicamentosDepositos;
