var Schema = require('mongoose').Schema;
var productSchema = new Schema({
    name: String,
    description: String
},{
    timestamps: true
});

module.exports = productSchema;