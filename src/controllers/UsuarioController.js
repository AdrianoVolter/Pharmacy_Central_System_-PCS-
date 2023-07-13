
const  Usuario  = require('../models/Usuarios')
const Sequelize = require('sequelize')

module.exports = {

    

    async listarUsuarios(req, res) {
        const usuarios  = await Usuario.findAll();

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
             const usuario = await Usuario.create({nome, sobrenome, genero, data_nascimento, cpf, telefone, email, senha, status});
            if (!usuario){
                return res.status(400).send({error: 'Não foi possivel criar o usuario!'})
            }else{
                return res.send({message: 'Usuario criado com sucesso!', usuario})
                
            }
        }catch(err){
            console.error(err)
            return res.status(400).send({error: err.message})
        }
       
    }
}