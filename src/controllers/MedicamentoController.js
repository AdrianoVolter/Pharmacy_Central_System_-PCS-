const Medicametos = require('../models/Medicamentos');
const Usuario = require('../models/Usuario');
const DepositosUsuarios = require('../models/DepositosUsuarios');
const MedicamentosDepositos = require('../models/MedicamentosDepositos');
const Depositos = require('../models/Depositos');

module.exports = {
    async criarMedicamento(req, res) {
        try {
        const { 
            nome_medicamento,
            nome_laboratorio,
            descricao, 
            dosagem,
            unidade_dosagem, 
            tipo_medicamento,
            preco,
            quantidade,
            valor 
        } = req.body;
        } catch (error) {
            console.log(error);
        }
    }
}