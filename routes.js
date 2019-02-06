const Router = require('express').Router;
var productController = require('./controllers/productsController');

module.exports = (app) => {
    var router = Router();
    router
        .get('/:id', productController.getById)
        .get('/', productController.getById)
        .post('/', productController.create);

    app.all('/api/*', require('./middleware/auth'), require('./middleware/databaseContext'));
    app.use('/api/products', router);
}