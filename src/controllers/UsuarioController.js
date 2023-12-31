const Usuario = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

config();

module.exports = {
  //criar usuario
  async criarUsuario(req, res) {
    try {
      const {
        nome,
        sobrenome,
        genero,
        data_nascimento,
        cpf,
        telefone,
        email,
        senha,
        status,
      } = req.body;

      const usuarioExiste = await Usuario.findOne({ where: { cpf: cpf } });
      if (usuarioExiste) {
        return res.status(409).send({ error: "Usuario já existe!" });
      }
      // verificar se o email já existe
      const emailExiste = await Usuario.findOne({ where: { email: email } });
      if (emailExiste) {
        return res.status(409).send({ error: "Email já existe!" });
      }

      if (nome.length < 3 || sobrenome.length < 3) {
        return res.status(400).send({
          error: "O nome e o sobrenome devem ter no mínimo 3 caracteres!",
        });
      }

      const dataNascimento = new Date(data_nascimento);
      if (isNaN(dataNascimento.getTime())) {
        return res
          .status(400)
          .send({ error: "A Data de Nascimento não é uma data válida." });
      }
      const cpfSemPontos = cpf.replace(/[.-]/g, "");
      if (cpfSemPontos.length !== 11) {
        return res.status(400).send({ error: "O CPF deve ter 11 caracteres." });
      }

      const usuario = await Usuario.create({
        nome,
        sobrenome,
        genero,
        data_nascimento,
        cpf,
        telefone,
        email,
        senha,
        status,
      });

      if (!usuario) {
        return res
          .status(400)
          .send({ error: "Não foi possivel criar o usuario!" });
      } else {
        return res
          .status(201)
          .send({ message: "Usuario criado com sucesso!", usuario });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).send({ error: err.message });
    }
  },
  //Login do usuario
  async loginUsario(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { email: email } });

      if (!usuario) {
        return res.status(404).send({ error: "Usuario não encontrado!" });
      } else {
        const payload = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        };
        if (usuario.senha === senha) {
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400,
          });
          return res.status(200).send({
            message: "Login realizado com sucesso!",
            usuario: payload,
            token: token,
          });
        } else {
          return res.status(400).send({ error: "Senha incorreta!" });
        }
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  //atualizar usuario pelo id metodo patch
  async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, sobrenome, genero, telefone } = req.body;
      const usuario = await Usuario.findOne({
        where: {
          id: id,
        },
      });
      //verificar se o usuario esta atualizando o seu proprio usuario
      if (Number(id) !== Number(req.usuario.id)) {
        return res.status(403).send({
          error: "Acesso negado! Você só pode atualizar seus próprios dados.",
        });
      }
      if (!usuario) {
        return res.status(404).send({ error: "Usuario não encontrado!" });
      } else {
        if (nome.length < 3 || sobrenome.length < 3) {
          return res.status(400).send({
            error: "O nome e o sobrenome devem ter no mínimo 3 caracteres!",
          });
        }
        await Usuario.update(
          { nome, sobrenome, genero, telefone },
          { where: { id: id } }
        );
        return res.status(200).send({
          message: "Usuario atualizado com sucesso!",
          usuario: { id, nome, sobrenome, genero, telefone },
        }); //codigo 200 = ok , 204 não tem conteudo
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  //atualizar status do usuario pelo id
  async atualizarStatusUsuario(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (status !== "Ativo" && status !== "Inativo") {
        //verificar se o status é Ativo ou Inativo
        return res
          .status(400)
          .send({ error: "Status deve ser Ativo ou Inativo!" });
      }
      const usuario = await Usuario.findOne({ where: { id: id } });

      //verificar se o usuario esta atualizando o seu proprio usuario
      if (Number(id) !== Number(req.usuario.id)) {
        return res.status(403).send({
          error: "Acesso negado! Você só pode atualizar seus próprios dados.",
        });
      }
      if (!usuario) {
        return res.status(404).send({ error: "Usuario não encontrado!" });
      } else {
        await Usuario.update({ status }, { where: { id: id } });
        return res.status(200).send({
          message: "Status do usuario atualizado com sucesso!",
          usuario: { id, status },
        });
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  //lista usuario pelo id
  async listarUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findOne({ where: { id: id } });

      if (!usuario) {
        return res
          .status(404)
          .send({ error: "Usuario não encontrado ou não existe! " });
      } else {
        usuario.senha = undefined;
        return res
          .status(200)
          .send({ message: "Usuario encontrado!", usuario });
      }
    } catch (error) {
      return res.status(400).send({
        error: error.message,
        cause: error.parent,
      });
    }
  },
  //atualizar senha do usuario pelo id , endpoint privado
  async atualizarSenhaUsuario(req, res) {
    try {
      const { id } = req.params;
      const { senha } = req.body;
      const usuario = await Usuario.findOne({ where: { id: id } });

      //verificar se o usuario esta atualizando o seu proprio usuario
      if (Number(id) !== Number(req.usuario.id)) {
        return res.status(403).send({
          error: "Acesso negado! Você só pode atualizar seus próprios dados.",
        });
      }
      if (!usuario) {
        return res.status(404).send({ error: "Usuario não encontrado!" });
      } else {
        await Usuario.update({ senha }, { where: { id: id } });
        return res.status(204).send({
          message: "Senha do usuario atualizado com sucesso!",
          usuario: { id, senha },
        });
      }
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
