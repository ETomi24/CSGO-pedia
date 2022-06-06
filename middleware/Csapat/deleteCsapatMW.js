/*
*Removes a csapat from datebase, the entity used here is: res.locals.csapat
*Removes the "jatekos" entities also which are connected to this "csapat" entity
*Redirects to /csapat after delete
*/

const requireOption = require("../requireOption");

module.exports = function(objectrepository){
    return function(req, res, next) {
        const JatekosModel = requireOption(objectrepository,'JatekosModel');
        if (typeof res.locals.csapat === 'undefined') {
            return next();
        }
        JatekosModel.deleteMany({_csapat : res.locals.csapat._id}, (err) => {
            if(err){
                return next(err);
            }
        });
        res.locals.csapat.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/csapat');
        });
    };
}