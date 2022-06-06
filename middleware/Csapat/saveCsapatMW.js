/*
* Using POST params update or create a csapat to the database
* If res.locals.csapat is there it's an update, otherwise this middleware creates an entity
* Redirects to /csapat after success
*/

const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
    const CsapatModel = requireOption(objectrepository,'CsapatModel');

    return function (req, res, next) {
        if (typeof req.body.nev === 'undefined' ||
            typeof req.body.alapitasi_ev === 'undefined'
        ) {
            return next();
        }
        if (typeof res.locals.csapat === 'undefined') {
            res.locals.csapat = new CsapatModel();
        }
        res.locals.csapat.nev = req.body.nev;
        res.locals.csapat.alapitasi_ev = req.body.alapitasi_ev;

        res.locals.csapat.save((err)  => {
            if(err){
                return next(err);
            }
            return res.redirect('/csapat');
        })
    };
}