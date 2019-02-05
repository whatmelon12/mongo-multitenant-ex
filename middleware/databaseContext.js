var mongoose = require('mongoose');
var mongooseConf = require('../config/mongoose');
var handleError = require('../middleware/handleError');

var createDbContext = (req, res, next) => {
    let dbContext;
    let tenant = req.tenant;
    console.log(`Creating databaseContext for tenant: ${tenant}`);
    
    try {
        dbContext = mongoose.createConnection(
            `${mongooseConf.baseUri}${tenant}?ssl=true`,
            mongooseConf.options
        );
    
        req.dbContext = dbContext;
        next();
    } catch(error) {
        handleError(req, req, error);
    }
}

module.exports = createDbContext;