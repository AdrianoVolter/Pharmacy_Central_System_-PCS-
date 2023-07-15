const { verify } = require('jsonwebtoken');
const { config } = require('dotenv');
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
        
           const token = req.headers.authorization;

            if (!token) {
                return res.status(401).send({error: 'Não autorizado!'})
            }


            try {
                const decoded = verify(token, process.env.SECRET_KEY);
                req.usuario = decoded;
                next();
            } catch (error) {
                return res.status(401).send({error: 'Não autorizado!'})
        }
    }
}

