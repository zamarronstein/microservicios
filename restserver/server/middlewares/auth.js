/**
 * Verificar Token
 */

const jwt = require('jsonwebtoken');

const ADMIN_ROLE = 'ADMIN_ROLE';

let verificaToken = (req, res, next) => {

    let token =  req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};

let verificaRole = (req, res, next) => {

    let user = req.usuario;

    if (ADMIN_ROLE !== user.role) {
        return res.status(401).json({
            ok: false,
            message: 'Invalid Role!'
        });
    }
    
    next();
};

module.exports = { verificaToken, verificaRole };