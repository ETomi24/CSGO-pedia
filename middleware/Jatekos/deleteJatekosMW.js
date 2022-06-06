/*
*Removes a jatekos from the datebase, the entity used here is: res.locals.jatekos
*Redirects to / after delete
*/

const requireOption = require("../requireOption");


module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.jatekos === 'undefined') {
            return next();
        }

        res.locals.jatekos.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/`);
        });
    };
}