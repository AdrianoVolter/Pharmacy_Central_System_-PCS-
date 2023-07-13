'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('usuarios', 'senha');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('usuarios', 'senha', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  }
};
