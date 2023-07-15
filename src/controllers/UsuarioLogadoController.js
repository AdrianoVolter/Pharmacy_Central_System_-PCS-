const Usuarios = require('../models/Usuarios')


module.exports = {
    async listarUsuarioLogado(req, res){
        try {
            const usuario = await Usuarios.findOne({where:{id: req.usuario.id}})
            if (!usuario){
                return res.status(404).send({error: 'Usuário não encontrado!'})
            }
            return res.status(200).send({usuario})
        }
        catch (error) {
            return res.status(400).send({error: 'Não foi possivel listar o usuário!'})
        }
    }
}
