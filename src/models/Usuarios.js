const {INTEGER, STRING, DATE, DATEONLY, ENUM, Sequelize} = require('sequelize')
const  connection  = require('../database/connection')

const Usuario = connection.define("usuarios", {
    
      nome:{
        type:STRING,
        allowNull:false,
        validator:{
           length: [2,20] 
        }
            
      },
      sobrenome:{
        type:STRING,
        allowNull:false,
        validator:{
            length: [2,20] 
         }
      },
      genero:{
        type:STRING,
        allowNull:true,
      },
      data_nascimento:{
        type:DATEONLY,
        allowNull:false,
        validate: {
            isDate: {
              args: true,
              msg: 'A Data de Nascimento deve ser uma data válida.'
            }
        },
      },
      cpf:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            len:{
                args: [11], 
                msg: 'O CPF deve ter o tamanho de 11 caracteres.'
            }
        }
      },
      telefone:{
        type:STRING,
        allowNull:true,
      },
      email:{
        type:STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: {'msg': 'E-mail invalido !'}
        }
      },
      senha: {
        type: STRING,
        allowNull: false,
        unique:true,
        validate: {
            len:{args: [8, 100], msg: "A senha tem que ter mais de 8 caracteres !"},
            is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/ , msg: "Error"
          }
      },
      status:{
        type:ENUM('Ativo', 'Inativo'),
        allowNull:false,
        defaultValue: 'Ativo'
      },
      created_at: {
        type: DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
})


module.exports = Usuario

