"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("medicamentos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_medicamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_laboratorio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dosagem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade_dosagem: {
        type: Sequelize.STRING, //OBS
        allowNull: false,
      },
      tipo_medicamento: {
        type: Sequelize.ENUM("Controlado", "Não Controlado"),
        allowNull: false,
      },
      preco: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("medicamentos");
  },
};
