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
}
}

