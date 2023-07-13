const {INTEGER, STRING, DATE, ENUM} = require('sequelize')
const  connection  = require('../database/connection')

const Medicamentos = connection.define('medicamentos', {
    id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nome_medicamento:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [3, 50],
                msg: 'O nome do medicamento deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      },
      nome_laboratorio:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [3, 50],
                msg: 'O nome do laboratório deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      },
      descricao:{
        type:STRING,
        allowNull:true
      },
      dosagem:{
        type:INTEGER,
        allowNull:false,
        validate    : {
            isNumeric: {
                args: true,
                msg: 'A dosagem deve ser um número.'
            }
        }
      },
      unidade_dosagem:{
        type:STRING, //OBS 
        allowNull:false,
        validate:{
            isIn: {
                args: [['mg', 'mcg', 'g', 'mL', '%', 'Outros']],
                msg: 'A unidade da dosagem deve ser mg, mcg, g, mL, % ou Outros.'
            }
        }
      },
      tipo_medicamento:{
        type:ENUM('Controlado', 'Não Controlado'),
        allowNull:false,
        validate:{
            isIn: {
                args: [['Controlado', 'Não Controlado']],
                msg: 'O tipo do medicamento deve ser Controlado ou Não Controlado.'
            }
        }
      },
      preco:{
        type:INTEGER,
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
      createdAt: {
        type: DATE,
        allowNull: false
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DATE,
        allowNull: true
      }
});

module.exports = Medicamentos;
