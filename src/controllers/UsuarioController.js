
const  Usuario  = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const { config } = require('dotenv');
//const { verify } = require('jsonwebtoken');


config();

module.exports = {

    async listarUsuarios(req, res) {
        const usuarios  = await Usuario.findAll(
            {
                attributes: ['id', 'nome', 'sobrenome', 'genero', 'data_nascimento', 'cpf', 'telefone', 'email', 'status', 'createdAt', 'updatedAt']
            }
        );

        if (!usuarios){
            return res.status(400).send({error: 'Não encontro a lista de usuarios!'})
        }else{
            return res.send({message: 'Lista de Usuarios', usuarios})
        }
    },

    async criarUsuario(req, res){

        try{
            const {nome, sobrenome, genero, data_nascimento, cpf, telefone, email, senha, status} = req.body;

           
            const usuarioExiste = await Usuario.findOne({where:{cpf: cpf}});
            if (usuarioExiste){
                return res.status(409).send({error: 'Usuario já existe!'})
            }
            // verificar se o email já existe
            const emailExiste = await Usuario.findOne({where:{email: email}});
            if (emailExiste){
                return res.status(409).send({error: 'Email já existe!'})
            }
            const usuario = await Usuario.create({nome, sobrenome, genero, data_nascimento, cpf, telefone, email, senha, status});
            

            if (!usuario){
                return res.status(400).send({error: 'Não foi possivel criar o usuario!'})
            }else{
                return res.status(201).send({message: 'Usuario criado com sucesso!', usuario})
                
            }
        }catch(err){
            console.error(err)
            return res.status(400).send({error: err.message})
        }
       
    },

    async loginUsario(req, res){

        try {
            const {email, senha} = req.body;
            const usuario = await Usuario.findOne({where:{email: email}});
            
            if (!usuario){
                return res.status(404).send({error: 'Usuario não encontrado!'})
            }else{
                if (usuario.senha === senha){
                    const token = jwt.sign({id: usuario.id}, process.env.SECRET_KEY, {expiresIn: 86400});
                    return res.status(200).send({message: 'Login realizado com sucesso!', usuario, token})
                }else{
                    return res.status(400).send({error: 'Senha incorreta!'})
                }
            }

        } catch (error) {
            //console.error(error)
            return res.status(400).send({error: error.message})
        }
    },
    //atualizar usuario pelo id metodo patch
            
       
}