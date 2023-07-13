const {INTEGER, STRING, DATE, ENUM} = require('sequelize')
const  connection  = require('../database/connection')


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


module.exports = MedicamentosDepositos;
