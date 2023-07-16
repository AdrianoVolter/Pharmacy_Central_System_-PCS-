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

            // if (depositoExiste){
            //     return res.status(409).send({error: 'O deposito Ja existe!', CNPJ: cnpj, razao_social})
            // }

            if (depositoExiste){
                const depositoUsuarioExiste = await DepositosUsuarios.findOne({where:{
                    id_depositos: depositoExiste.id,
                    id_usuarios: userId
                }});
                if (depositoUsuarioExiste){
                    return res.status(409).send({error: 'O deposito Ja existe!', CNPJ: cnpj, razao_social})
                }else{

                await DepositosUsuarios.create({
                    id_depositos: depositoExiste.id,
                    id_usuarios: userId
                  });
          
                  return res.status(201).send({
                    Identificador: depositoExiste.id,
                    razao_social: depositoExiste.razao_social,
                    Usuario: usuario,
                    deposito: depositoExiste
                  });
                }
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

    },

    async atualizarDeposito(req, res){
        try {
            const {id} = req.params;
            const {nome_fantasia, email, telefone, celular, cep, logradouro, numero, bairro, cidade, estado, complemento, latitude, longitude} = req.body;
            if (nome_fantasia.length < 3){
                return res.status(400).send({error: 'O nome fantasia deve ter no mínimo 3 caracteres!'})
                 }
                const depositoUsuario = await DepositosUsuarios.findOne({where:{id_depositos: id, id_usuarios: req.usuario.id}});
                if (!depositoUsuario){
                    return res.status(403).send({ error: 'Acesso negado!\n Você só pode atualizar dados de depósitos que você é usuário.' });
                }
                const deposito = await Depositos.findOne({where:{id: id}});

            if (!deposito){
                return res.status(404).send({error: 'Depósito não encontrado!'})
            }else{
                await Depositos.update(
                    {nome_fantasia, email, telefone, celular, cep, logradouro, numero, bairro, cidade, estado, complemento, latitude, longitude}, 
                    {where:{id: id}});
                return res.status(204).send({message: 'Depósito atualizado com sucesso!', deposito: {id, nome_fantasia, email, telefone, celular, cep, logradouro, numero, bairro, cidade, estado, complemento, latitude, longitude}}) 
            }
        } catch (error) {
            console.error(error)
            return res.status(400).send({error: error.message})
       
        }
    },

    async listarDepositos(req, res){
        try {
            const depositos = await Depositos.findAll({
                include: {
                    association: 'usuarios',
                    attributes: ['id', 'nome']
                }
            });

            if (!depositos){
                return res.status(404).send({error: 'Não existe nenhum depósito cadastrado!'})
            }else{
                return res.status(200).send({message: 'Depósitos encontrados!', depositos })
            }
        } catch (error) {
            console.error(error)
            return res.status(400).send({error: error.message})
        }
    },

   async atualizarStatusDeposito(req, res){
        try {
            const {id} = req.params;
            const {status} = req.body;
            const depositoUsuario = await DepositosUsuarios.findOne({where:{id_depositos: id, id_usuarios: req.usuario.id}});
            if (!depositoUsuario){
                return res.status(403).send({ error: 'Acesso negado!\n Você só pode atualizar dados de depósitos que você é usuário.' });
            }
            if (status !== 'Ativo' && status !== 'Inativo'){ //verificar se o status é Ativo ou Inativo
                return res.status(400).send({error: 'Status deve ser Ativo ou Inativo!'})
            }
            const deposito = await Depositos.findOne({where:{id: id}});

            if (!deposito){
                return res.status(404).send({error: 'Depósito não encontrado!'})
            }else{
                await Depositos.update(
                    {status}, 
                    {where:{id: id}});
                return res.status(204).send({message: 'Status do depósito atualizado com sucesso!', 
                deposito: {id, status}}) 
            }
        } catch (error) {
            console.error(error)
            return res.status(400).send({error: error.message})
        }
    }
}