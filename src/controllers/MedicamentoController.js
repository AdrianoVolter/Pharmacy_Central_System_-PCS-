const Medicamentos = require('../models/Medicamentos')

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
      
          const medicamento = await Medicamentos.create({
            // id_usuarios: req.id_usuarios,
            // id_depositos: req.id_depositos,
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
            return res
              .status(400)
              .send({ error: 'Não foi possível criar o medicamento!' });
          } else {
            return res.status(201).send({ medicamento });
          }
        } catch (err) {
          return res.status(500).send({
            err: err.message,
            cause: 'Erro no servidor!'
          });
        }
      },
}      