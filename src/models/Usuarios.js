const {STRING, DATE, DATEONLY, ENUM, Sequelize} = require('sequelize')
const  connection  = require('../database/connection')

const Usuario = connection.define("usuarios", {
    
      nome:{
        type:STRING,
        allowNull:false,
        validator:{
           len: {
                args: [3, 50],
                msg: 'O nome deve ter no mínimo 2 caracteres e no máximo 50 caracteres.'
           },
        }   
      },
      sobrenome:{
        type:STRING,
        allowNull:false,
        validator:{
            len: [3, 50],
            msg: 'O sobrenome deve ter no mínimo 2 caracteres e no máximo 50 caracteres.' 
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
                args: [11, 11], 
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
            isEmail: {
                args: true,
                msg: 'E-mail invalido !'
            },
        }
      },
      senha: {
        type: STRING,
        allowNull: false,
        validate:{
          isStrongPassword: {
            args: [
              {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
              },
            ],
            msg: 'A senha deve ter no mínimo 8 caracteres, mínimo 1 letra maiúscula, mínimo 1 número e mínimo 1 caractere especial.',
          },

      },
      status:{
        type:ENUM('Ativo', 'Inativo'),
        allowNull:false,
        defaultValue: 'Ativo',
      },
      createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
      }
}})


module.exports = Usuario

