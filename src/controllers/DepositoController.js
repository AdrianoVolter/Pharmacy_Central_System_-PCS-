const Depositos = require('../models/Depositos')

module.exports = {

    async criarDeposito(req, res) {

        try {

            const {
                razao_social,
                cnpj,
                nome_fantasia,
                email,
                telefone, 
                celular, 
                cep, 
                logradouro, 
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
                return res.status(409).send({error: 'O deposito Ja existe!'})
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
                bairro, 
                cidade, 
                estado, 
                complemento,
                latitude, 
                longitude,
                status})
            if (!deposito){
                return res.status(400).send({error: 'Não foi possivel criar o depósito!'})
            }else{
                return res.status(201).send({Identificador: id, razaoSocial: razao_social, ...req.body})
                
            }

        }catch(err){
            return res.status(500).send({
                err: err.message,
                cause: "Erro no servidor!"

            })
        }

    }
}