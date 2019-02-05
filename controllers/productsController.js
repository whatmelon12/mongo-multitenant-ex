var handleError = require('../middleware/handleError');
var ProducstService = require('../services/productsService');

var getById = (req, res) => {
    var Product = new ProducstService(req.dbContext);
    var id = req.params.id;

    Product.getById(id).then(product => {
        if(!product) {
            return res.status(404).send();
        }
        return res.send(product);
    }).catch(error => handleError(req, res, error));
}

var create = (req, res) => {
    var Product = new ProducstService(req.dbContext);
    var payload = req.body;

    Product.create(payload).then(product => {
        return res.status(201).send(product);
    }).catch(error => handleError(req, res, error));
}

module.exports = {
    getById,
    create
}