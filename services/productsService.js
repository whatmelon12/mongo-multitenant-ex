var schema = require('../models/product');

function ProductsService(context) {
    this.Model = context.model('Products', schema);

    this.getById = function(id) {
        if(!id) {
            return this.Model.find({});
        }
        return this.Model.findById(id);
    }

    this.create = function(data) {
        product = new this.Model(data);
        return product.save();
    }
};

module.exports = ProductsService;