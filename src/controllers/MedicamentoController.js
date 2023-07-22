const Medicamentos = require('../models/Medicamentos');
const MedicamentosDepositos = require('../models/MedicamentosDepositos');
const DepositoUsuarios = require('../models/DepositosUsuarios');
const Depositos = require('../models/Depositos');
const Usuario = require('../models/Usuarios');

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
                quantidade,
                id_depositos
            } = req.body;
    
            const id_usuarios = req.usuario.id;
            console.log(id_usuarios);
    
            const depositoUsuario = await DepositoUsuarios.findAll({
                where: {
                    id_usuarios: id_usuarios,
                    id_depositos: id_depositos
                }
            });
            //se digitou um depósito que não é do usuário
            if (!depositoUsuario ||depositoUsuario.length == 0) {
                return res.status(400).send({ error: 'Usuário não possui depósito associado!' });
            }

            const deposito = await Depositos.findOne({
                where: {
                    id: id_depositos
                }
            });
    
            console.log("Deposito encontrado:", deposito); // Adicionando o log
    
            if (!deposito) {
                return res.status(400).send({ error: 'Depósito com o ID fornecido não existe!' });
            }
    
            let medicamento = await Medicamentos.findOne({
                where: {
                    nome_medicamento,
                    nome_laboratorio
                }
            });
    
            if (!medicamento) {
                medicamento = await Medicamentos.create({
                    nome_medicamento,
                    nome_laboratorio,
                    descricao,
                    dosagem,
                    unidade_dosagem,
                    tipo_medicamento
                });
            }
    
            const medicamentoDeposito = await MedicamentosDepositos.findOne({
                where: {
                    id_medicamentos: medicamento.id,
                    id_depositos: id_depositos
                }
              
            });
    
            if (medicamentoDeposito) {
                return res.status(409).send({ error: 'Medicamento já cadastrado neste depósito!' });
            }
    
            await MedicamentosDepositos.create({
                id_medicamentos: medicamento.id,
                id_depositos: id_depositos,
                preco: preco,
                quantidade: quantidade,
                descricao: descricao
            });
    
            return res.status(201).send({
                Message: "Medicamento cadastrado!",
                identificador: medicamento.id,
                nomeMedicamento: medicamento.nome_medicamento,
                medicamento: {
                    id: medicamento.id,
                    nome_medicamento: medicamento.nome_medicamento,
                    nome_laboratorio: medicamento.nome_laboratorio,
                    dosagem: medicamento.dosagem,
                    unidade_dosagem: medicamento.unidade_dosagem,
                    tipo_medicamento: medicamento.tipo_medicamento,
                    preco,
                    quantidade,
                    descricao
                },
                
               usuarioResponsavel: {
                usuario: {
                    nome: req.usuario.nome
                },
                deposito: {
                    id: id_depositos
                },
            }
            });
    
        } catch (err) {
            
            return res.status(500).send({
                err: err.message,
                cause: 'Erro no servidor!'
            });
        }
    }, 

    async  atualizarMedicamento(req, res) {
        try {
            const { id } = req.params;
            const { preco, quantidade, descricao, id_depositos } = req.body; // Adicione id_depositos para atualizar o depósito selecionado
            const id_usuarios = req.usuario.id;
            console.log(id_usuarios);
    
            const depositoUsuario = await DepositoUsuarios.findOne({
                where: {
                    id_usuarios: id_usuarios,
                    id_depositos: id_depositos
                }
            });
    
            if (!depositoUsuario) {
                return res.status(400).send({ error: 'Usuário não possui depósito associado a esse id_depositos!' });
            }
    
            const medicamento = await Medicamentos.findOne({
                where: {
                    id: id
                }
            });
    
            if (!medicamento) {
                return res.status(404).send({ error: 'Medicamento não encontrado!' });
            }
    
            const medicamentoDeposito = await MedicamentosDepositos.findOne({
                where: {
                    id_medicamentos: medicamento.id,
                    id_depositos: id_depositos
                }
            });
    
            if (!medicamentoDeposito) {
                return res.status(404).send({ error: 'Medicamento não encontrado no depósito!' });
            }
    
            await medicamentoDeposito.update({
                preco: preco,
                quantidade: quantidade,
                descricao: descricao,

            });
    
            return res.status(200).send({
                Message: "Medicamento atualizado!",
                identificador: medicamento.id,
                nomeMedicamento: medicamento.nome_medicamento,
                preco,
                quantidade,
                descricao,
                usuarioResponsavel: {
                    usuario: {
                        nome: req.usuario.nome
                    },
                    deposito: {
                        id: id_depositos
                    },
                }
            });
    
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                err: err.message,
                cause: 'Erro no servidor!'
            });
        }
    },
//listar medicamentos por query params Contolado ou Não Controlado
    async listarMedicamentos(req, res) {
        try {

            const valorfunction = function (valor) { 
                if (valor == 'controlado') {
                    return 'Controlado';
                } else if (valor == 'naocontrolado') {
                    return 'Não Controlado';
                } else {
                    return 'Controlado ou Não Controlado';
                }
            }

            const tipo_medicamento = valorfunction(req.query.tipo_medicamento);

            if (req.query.tipo_medicamento !== 'controlado' && req.query.tipo_medicamento !== 'naocontrolado' && req.query.tipo_medicamento !== undefined) {
                return res.status(400).send({ error: 'Tipo de medicamento inválido , digite controlado ou naocontrolado!' });
            }
            if (req.query.tipo_medicamento == undefined) {


                const medicamentos = await Medicamentos.findAll();
                return res.status(200).send({
                    medicamentos: medicamentos.map(medicamentos => {
                        return {
                            id: medicamentos.id,
                            nome_medicamento: medicamentos.nome_medicamento,
                            nome_laboratorio: medicamentos.nome_laboratorio,
                            dosagem: medicamentos.dosagem,
                            unidade_dosagem: medicamentos.unidade_dosagem,
                            tipo_medicamento: medicamentos.tipo_medicamento,
                            preco: medicamentos.preco,
                            quantidade: medicamentos.quantidade,
                            descricao: medicamentos.descricao,
                        }
                    })
                });
            } else
            if (!tipo_medicamento) {
                return res.status(400).send({ error: 'Tipo de medicamento não informado!' });
            }

            // if (tipo_medicamento != 'controlado' && tipo_medicamento != 'naocontrolado') {
            //     return res.status(400).send({ error: 'Tipo de medicamento inválido!' });
            // }
            const medicamentos = await Medicamentos.findAll({
                where: {
                    tipo_medicamento: tipo_medicamento
                }
            });
            return res.status(200).send({
                medicamentos: medicamentos.map(medicamentos => {
                    return {
                    id: medicamentos.id,
                    nome_medicamento: medicamentos.nome_medicamento,
                    nome_laboratorio: medicamentos.nome_laboratorio,
                    dosagem: medicamentos.dosagem,
                    unidade_dosagem: medicamentos.unidade_dosagem,
                    tipo_medicamento: medicamentos.tipo_medicamento,
                    preco: medicamentos.preco,
                    quantidade: medicamentos.quantidade,
                    descricao: medicamentos.descricao,
                }
                })
            });
        } catch (err) {
            return res.status(500).send({
                err: err.message,
                cause: 'Erro no servidor!'
            });
        }
    }

}

