const getJatekosokMW  = require('../middleware/Jatekos/getJatekosokMW');
const getJatekosMW  = require('../middleware/Jatekos/getJatekosMW');
const saveJatekosMW = require('../middleware/Jatekos/saveJatekosMW');
const deleteJatekosMW = require('../middleware/Jatekos/deleteJatekosMW');

const getCsapatokMW = require('../middleware/Csapat/getCsapatokMW');
const getCsapatMW = require('../middleware/Csapat/getCsapatMW');
const saveCsapatMW = require('../middleware/Csapat/saveCsapatMW');
const deleteCsapatMW = require('../middleware/Csapat/deleteCsapatMW');

const renderMW = require('../middleware/renderMW');

const JatekosModel = require('../models/jatekos');
const CsapatModel = require('../models/csapat');

module.exports = function (app) {
    const objectrepository = {
        JatekosModel: JatekosModel,
        CsapatModel: CsapatModel
    };

    app.use('/jatekos/new',
        getCsapatokMW(objectrepository),
        saveJatekosMW(objectrepository),
        renderMW(objectrepository,"Ujjatekos"));

    app.use('/jatekos/edit/:jatekosId',
        getJatekosMW(objectrepository),
        getCsapatokMW(objectrepository),
        saveJatekosMW(objectrepository),
        renderMW(objectrepository,"Jatekosmodositas"));

    app.get('/jatekos/delete/:jatekosId',
        getJatekosMW(objectrepository),
        deleteJatekosMW(objectrepository));

    app.get('/',
        getJatekosokMW(objectrepository),
        renderMW(objectrepository,"index"));

    app.use('/csapat/new',
        saveCsapatMW(objectrepository),
        renderMW(objectrepository,"Ujcsapat"));

    app.use('/csapat/edit/:csapatId',
        getCsapatMW(objectrepository),
        saveCsapatMW(objectrepository),
        renderMW(objectrepository,"Csapatmodositas"));


    app.get('/csapat/delete/:csapatId',
        getCsapatMW(objectrepository),
        deleteCsapatMW(objectrepository));

    app.get('/csapat',
        getCsapatokMW(objectrepository),
        renderMW(objectrepository,"Csapatok"));


};

