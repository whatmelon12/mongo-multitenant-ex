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

        dbContext.on('connected', () => console.log(`Connected to ${tenant} successfully`));
        dbContext.on('disconnected', () => console.log(`Disconnected from ${tenant} successfully`));
        dbContext.on('error', (error) => handleError(req, res, {error, message: `Failed to connect tenant: ${tenant}`}));

        next();
    } catch(error) {
        handleError(req, req, error);
    }
}

module.exports = createDbContext;