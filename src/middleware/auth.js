const { config } = require('dotenv');
const { verify } = require('jsonwebtoken');
config();

module.exports = {
// valilidar o token
    async auth(req, res, next) {
        try {
            const { authorization } = req.headers;
            console.log(authorization)
            console.log(verify(authorization, process.env.SECRET_KEY))

            if (verify(authorization, process.env.SECRET_KEY)) {
                 next();
            }else {
                return res.status(401).send({error: 'Não autorizado!'})
            }
        } catch (error) {
            return res.status(401).send({error: 'Não autorizado!'})
        }
    },

// valilidar o token e decodiificar o token
    async validarToken(req, res, next) {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];
            const decode = verify(token, process.env.SECRET_KEY);
            req.usuario = decode;
            next();
        } catch (error) {
            return res.status(401).send({error: 'Não autorizado!'})
        }
    }
}

