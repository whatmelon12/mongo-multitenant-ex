var jwt = require('jsonwebtoken');
var handleError = require('../middleware/handleError');
var tokenConf = require('../config/token');

var validateToken = (req, res, next) => {
    var token = req.headers['Authorization'];
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided'
        })
    }

    try {
        var decoded = jwt.verify(token, tokenConf.secret);
        if (decoded.exp <= Date.now()) {
            return res.status(401).send({
                auth: false,
                message: 'No token expired'
            })
        }

        req.tenant = token.tenant;
        next();
    } catch (error) {
        handleError(req, res, err);
    };
}

module.exports = validateToken;