const  Usuario  = require('../models/Usuarios')

module.exports = {
    async listarUsuarios(req, res) {
        const usuarios  = await Usuario.findAll();

        if (!usuarios){
            return res.status(400).send({error: 'Não encontro a lista de usuarios!'})
        }else{
            return res.send({message: 'Lista de Usuarios', usuarios})
        }
    }
}