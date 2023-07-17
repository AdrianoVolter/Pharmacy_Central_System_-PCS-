const Medicamentos = require('../models/Medicamentos');
const DepositosUsuarios = require('../models/DepositosUsuarios');
const MedicamentosDepositos = require('../models/MedicamentosDepositos');
//const Depositos = require('../models/Depositos');

module.exports = {
    async cadastroMedicamento(req, res) {
        const { 
            nome_medicamento, 
            nome_laboratorio, 
            descricao,
            dosagem,
            unidade_dosagem, 
            tipo_medicamento, 
            preco, 
            quantidade, 
            depositos 
        } = req.body;
        const { id } = req.usuario;
        try {
            const medicamento = await Medicamentos.create({ 
                nome_medicamento, 
                nome_laboratorio, 
                descricao,
                dosagem,
                unidade_dosagem, 
                tipo_medicamento, 
                preco, 
                quantidade 
            });
            const depositosUsuarios = await DepositosUsuarios.findAll({ where: { id_usuarios: id } });
            for (let i = 0; i < depositosUsuarios.length; i++) {
                const deposito = depositosUsuarios[i];
                if (depositos.includes(deposito.id_depositos)) {
                    await MedicamentosDepositos.create({ id_medicamentos: medicamento.id, id_depositos: deposito.id_depositos });
                }
            }
            return res.status(201).json({ medicamento });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
