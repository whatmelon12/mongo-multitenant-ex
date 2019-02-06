const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

var app = express();
app.use(bodyParser.json());

routes(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server started');
});