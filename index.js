var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

require('./routes/routes')(app);


var server = app.listen(3000, function () {
    console.log("ON : 3000");
});