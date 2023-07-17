const Usuarios = require('../models/Usuarios')
// funções do controller, para testar se o  usuario esta logado na rota privada

module.exports = {
    async listarUsuarioLogado(req, res){
        try {
            const usuario = await Usuarios.findOne({where:{id: req.usuario.id}})
            if (!usuario){
                return res.status(404).send({error: 'Usuário não encontrado!'})
            }
            return res.status(200).send({Message: 'Usuário esta Logado!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome
            }})
        }
        catch (error) {
            return res.status(400).send({error: 'Não foi possivel listar o usuário!'})
        }
    }
}
