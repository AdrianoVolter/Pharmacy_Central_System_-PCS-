const {INTEGER, STRING, DATE, FLOAT} = require('sequelize')
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
    preco:{
        type:FLOAT,
        allowNull:false,
        validate    : {
            isNumeric: {
                args: true,
                msg: 'O preço deve ser um número.'
            }
        }
    },
    quantidade:{
        type:INTEGER,
        allowNull:false,
        validate    : {
            isNumeric: {
                args: true,
                msg: 'A quantidade deve ser um número.'
            }
        }
    },
    descricao:{
        type:STRING,
        allowNull:false,
        validate    : {
            len: {
                args: [3, 50],
                msg: 'A descrição deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
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
}, {
    paranoid: true
}
)
 
Medicamentos.belongsToMany(Depositos, { through: MedicamentosDepositos, foreignKey: 'id_medicamentos' })
Depositos.belongsToMany(Medicamentos, { through: MedicamentosDepositos, foreignKey: 'id_depositos' })

module.exports = MedicamentosDepositos;
