const Medicamentos = require('../models/Medicamentos');
const MedicamentosDepositos = require('../models/MedicamentosDepositos');
const DepositoUsuarios = require('../models/DepositosUsuarios');

module.exports = {
  async cadastroMedicamento(req, res) {
    try {
        
        const {
            nome_medicamento,
            nome_laboratorio,
            descricao,
            dosagem,
            unidade_dosagem,
            tipo_medicamento,
            preco,
            quantidade
        } = req.body;
        
        const id_usuarios = req.usuario.id;
        console.log(id_usuarios);
        
        const depositoUsuario = await DepositoUsuarios.findOne({
            where: {
            id_usuarios: id_usuarios
            }
        });
        
        if (!depositoUsuario) {
            return res.status(400).send({ error: 'Usuário não possui depósito associado!' });
        }
        
        const id_depositos = depositoUsuario.id_depositos;
        const medicamento = await Medicamentos.findOne({
            where: {
            nome_medicamento,
            nome_laboratorio
            }
        });
        
        if (!medicamento) {
            // Se o medicamento não existe, criar um novo
            medicamento = await Medicamentos.create({
            nome_medicamento,
            nome_laboratorio,
            descricao,
            dosagem,
            unidade_dosagem,
            tipo_medicamento,
            preco,
            quantidade
            });
        } else {
           
            const medicamentoDeposito = await MedicamentosDepositos.findOne({
            where: {
                id_medicamentos: medicamento.id,
                id_depositos: id_depositos
            }
            });
        
            if (medicamentoDeposito) {
            return res.status(400).send({ error: 'Medicamento já cadastrado neste depósito!' });
            }
        
            await MedicamentosDepositos.create({
            id_medicamentos: medicamento.id,
            id_depositos: id_depositos
            });
        }
        
        return res.status(201).send({
            identificador: medicamento.id,
            nomeMedicamento: medicamento.nome_medicamento,
            Message: "Medicamento criado e associado ao depósito!",
            medicamento
        });
        
    } catch (err) {
      return res.status(500).send({
        err: err.message,
        cause: 'Erro no servidor!'
      });
    }
  },
};
