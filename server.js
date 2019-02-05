const express = require('express');
const routes = require('./routes');

var app = express();
routes(app);

app.listen(process.env.PORT || 3000, () => {
    console.log('Express server started');
});