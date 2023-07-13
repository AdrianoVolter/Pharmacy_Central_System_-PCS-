const {INTEGER, STRING, DATE, ENUM} = require('sequelize')
const  connection  = require('../database/connection')

const Deposito = connection.define('depositos', {
    id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    razao_social:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [3, 50],
                msg: 'A razão social deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      },
      cnpj:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:{
                args: [14],
                msg: 'O CNPJ deve ter o tamanho de 14 caracteres.'
            }
        }
      },
      nome_fantasia:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [3, 50],
                msg: 'O nome fantasia deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      },
      email:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: {'msg': 'E-mail invalido !'}
        }
      },
      telefone:{
        type:STRING,
        allowNull:true,
      },
      celular:{
        type:STRING,
        allowNull:false
      },
      cep:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:{
                args: [8],
                msg: 'O CEP deve ter o tamanho de 8 caracteres.'
            }
        }
      },
      logradouro: {
        type:STRING,
        allowNull: false,
        unique:true
      },
      numero:{
        type:STRING,
        allowNull:false
      },
      bairro:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [3, 50],
                msg: 'O bairro deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      },
      cidade:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [3, 50],
                msg: 'A cidade deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      },
      estado:{
        type:STRING,
        allowNull:false,
        validate:{
            len:{
                args: [2],
                msg: 'O estado deve ter o tamanho de 2 caracteres.'
            }
        }
      },
      complemento:{
        type:STRING,
        allowNull:true
      },
      latitude:{
        type:STRING,
        allowNull:true
      },
      longitude:{
        type:STRING,
        allowNull:true
      },
      status:{
        type:ENUM('Ativo', 'Inativo'),
        allowNull:false,
        defaultValue: 'Ativo',
        validate:{
            isIn:{
                args: [['Ativo', 'Inativo']],
                msg: 'O status deve ser Ativo ou Inativo.'
            }
        }
      },
      createdAt: {
        type:DATE,
        allowNull: false
      },
      updatedAt: {
        type:DATE,
        allowNull: false,
      },
      deleted_at: {
        type:DATE,
        allowNull: true
      },
})

module.exports = Deposito
