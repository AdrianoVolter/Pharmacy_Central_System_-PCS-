"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn("medicamentos", "preco"),
      queryInterface.removeColumn("medicamentos", "quantidade"),
      queryInterface.removeColumn("medicamentos", "descricao"),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("medicamentos", "preco", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "O preço deve ser um número.",
        },
      },
    });
    await queryInterface.addColumn("medicamentos", "quantidade", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          args: true,
          msg: "A quantidade deve ser um número.",
        },
      },
    });
    await queryInterface.addColumn("medicamentos", "descricao", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "A descrição deve ter no mínimo 3 caracteres e no máximo 50 caracteres.",
        },
      },
    });
  },
};
