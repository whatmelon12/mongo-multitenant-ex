var jwt = require('jsonwebtoken');
var handleError = require('../middleware/handleError');
var tokenConf = require('../config/token');

var validateToken = (req, res, next) => {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided'
        })
    }

    try {
        var decoded = jwt.verify(token, tokenConf.secret);
        if (Date.now() <= decoded.exp) {
            return res.status(401).send({
                auth: false,
                message: 'Token expired'
            })
        }

        req.tenant = decoded.family_name;
        next();
    } catch (error) {
        handleError(req, res, err);
    };
}

module.exports = validateToken;