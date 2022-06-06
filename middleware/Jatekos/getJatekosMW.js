/* Load a jatekos from the datebase using the :jatekosId param
* The result is saved to res.locals.jatekos
*/

const requireOption = require("../requireOption");


module.exports = function (objectrepository) {
    const JatekosModel = requireOption(objectrepository, 'JatekosModel');
    return function (req, res, next) {
        JatekosModel.findOne({_id: req.params.jatekosId}, (err, jatekos) => {
                if (err || !jatekos) {
                    return next(err);
                }
                res.locals.jatekos = jatekos;
                return next();
            }
        )
    };
}