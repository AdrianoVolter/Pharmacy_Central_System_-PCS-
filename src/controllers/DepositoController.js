const Depositos = require('../models/Depositos')

const DepositosUsuarios = require('../models/DepositosUsuarios')

module.exports = {

    async criarDeposito(req, res) {

        try {

            const userId = req.usuario.id; // id do usuario logado
            const usuario = req.usuario.nome;// dados do usuario logado
            const {
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone, 
                celular, 
                cep, 
                logradouro,
                numero, 
                bairro, 
                cidade, 
                estado, 
                complemento,
                latitude, 
                longitude,
                status

            } = req.body;

            const depositoExiste = await Depositos.findOne({where:{
                cnpj: cnpj,
                razao_social: razao_social
            }});

            if (depositoExiste){
                return res.status(409).send({error: 'O deposito Ja existe!', CNPJ: cnpj, razao_social})
            }

            const emailExiste = await Depositos.findOne({where:{email: email}});
            if (emailExiste){
                return res.status(409).send({error: 'Email já existe!'})
            }

            if (razao_social.length < 3 || nome_fantasia.length < 3){
                return res.status(400).send({error: 'Razão Social e nome Fantasia devem ter no mínimo 3 caracteres!'})
            }
            const deposito = await Depositos.create({razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone, 
                celular, 
                cep, 
                logradouro,
                numero, 
                bairro, 
                cidade, 
                estado, 
                complemento,
                latitude, 
                longitude,
                status})
                console.log(deposito)
            await DepositosUsuarios.create({id_depositos: deposito.id, id_usuarios: userId})

            if (!deposito){
                return res.status(400).send({error: 'Não foi possivel criar o depósito!'})
            }else{
                return res.status(201).send({Identificador: deposito.id, razao_social:deposito.razao_social, Usuario: usuario, deposito })
                
            }

        }catch(err){
            return res.status(500).send({
                err: err.message,
                cause: "Erro no servidor!"

            })
        }

    }
   
}