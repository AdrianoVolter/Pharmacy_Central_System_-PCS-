'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('medicamentos_depositos', 'preco', {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate    : {
            isNumeric: {
                args: true,
                msg: 'O preço deve ser um número.'
            }
        }
      }),
      queryInterface.addColumn('medicamentos_depositos', 'quantidade', {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate    : {
            isNumeric: {
                args: true,
                msg: 'A quantidade deve ser um número.'
            }
        }
      }),
      queryInterface.addColumn('medicamentos_depositos', 'descricao', {
        type: Sequelize.STRING,
        allowNull: false,
        validate    : {
            len: {
                args: [3, 50],
                msg: 'A descrição deve ter no mínimo 3 caracteres e no máximo 50 caracteres.'
            }
        }
      })
    ]);

     
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('medicamentos_depositos', 'preco'),
      queryInterface.removeColumn('medicamentos_depositos', 'quantidade'),
      queryInterface.removeColumn('medicamentos_depositos', 'descricao')
    ]);
     
  }
};
