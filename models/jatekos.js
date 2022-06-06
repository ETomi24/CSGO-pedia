const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Jatekos = db.model('Jatekos', {
    nev: String,
    eletkor: Number,
    _csapat: {
        type: Schema.Types.ObjectId,
        ref: 'Csapat'
    }
});

module.exports = Jatekos;