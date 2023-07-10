const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config.js');

const connection = new Sequelize(databaseConfig);

async function connectToDatabase() {
    try {
        console.log('Conectando ao banco de dados...');
        await connection.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}


connectToDatabase();


module.exports = connection;

