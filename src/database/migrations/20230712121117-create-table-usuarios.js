'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('users', { 
    id: {
      type:Sequelize.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true
    },
    nome:{
      type:Sequelize.STRING,
      allowNull:false
    },
    sobrenome:{
      type:Sequelize.STRING,
      allowNull:false
    },
    genero:{
      type:Sequelize.STRING,
      allowNull:true,
    },
    data_nascimento:{
      type:Sequelize.DATEONLY,
      allowNull:false,
    },
    cpf:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    telefone:{
      type:Sequelize.STRING,
      allowNull:true,
    },
    email:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
    },
    status:{
      type:Sequelize.ENUM('Ativo', 'Inativo'),
      allowNull:false,
      defaultValue: 'Ativo'
    }
  }); 
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('users');
    
  }
};
