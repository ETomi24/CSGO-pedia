const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/J2286F',
    { useNewUrlParser: true });

module.exports = mongoose;