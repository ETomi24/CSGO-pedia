/*
* Using POST params update or create a jatekos to the database
* If res.locals.jatekos is there it's an update, otherwise this middleware creates an entity
* Redirects to / after success
*/

const requireOption = require("../requireOption");


module.exports = function(objectrepository){
    const JatekosModel = requireOption(objectrepository,'JatekosModel');
    return function (req,res,next){
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.eletkor === 'undefined'||
            typeof req.body._csapat === 'undefined'
        ) {
            return next();
        }
        if (typeof res.locals.jatekos === 'undefined') {
            res.locals.jatekos = new JatekosModel();
        }
        res.locals.jatekos.nev = req.body.nev;
        res.locals.jatekos.eletkor = req.body.eletkor;
        res.locals.jatekos._csapat = req.body._csapat;

        res.locals.jatekos.save((err)  => {
            if(err){
                return next(err);
            }
            return res.redirect('/');
        })
    };
}