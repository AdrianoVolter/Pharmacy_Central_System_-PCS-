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

      const  id_usuarios  = req.usuario.id
      console.log(id_usuarios);
      
      const depositoUsuario = await DepositoUsuarios.findOne({
        where: {
          id_usuarios: id_usuarios
        }
      });

      if (!depositoUsuario) {
        return res.status(400).send({ error: 'Usuário não possui depósito associado!' });
      }

      const id_depositos = depositoUsuario.id_depositos; // Obtém o ID do depósito associado ao usuário

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

      if (!medicamento) {
        return res.status(400).send({ error: 'Não foi possível criar o medicamento!' });
      }

      const dedicamentoDepositoExiste = await MedicamentosDepositos.findOne({
        where: {
          id_medicamentos: medicamento.id,
          id_depositos: id_depositos
        }
      });

      if (dedicamentoDepositoExiste) {
        return res.status(400).send({ error: 'Medicamento já cadastrado neste depósito!' });
      }

      await MedicamentosDepositos.create({
        id_medicamentos: medicamento.id,
        id_depositos: id_depositos
      });

      return res.status(201).send({ Message: "Medicamento criado e associado ao depósito!", medicamento });
    } catch (err) {
      return res.status(500).send({
        err: err.message,
        cause: 'Erro no servidor!'
      });
    }
  },
};
