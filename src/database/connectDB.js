const {Sequelize} = require('sequelize');
const databaseConfig = require('../config/database');

const connection = new Sequelize(databaseConfig);


async function connectToDatabase() {
    try {
        await connection.authenticate();
        console.log('Conectado com sucesso, ao banco de dados');
    } catch (error) {
        console.error('Erro ao se conectar ao banco de dados :', error);
        throw error;
    }
}

connectToDatabase();


module.exports = connection;


