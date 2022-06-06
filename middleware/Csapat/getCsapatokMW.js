/* Load all csapat from datebase
* The result is saved to res.locals.csapatok
*/
const requireOption = require("../requireOption");
module.exports = function (objectrepository) {
    const CsapatModel = requireOption(objectrepository, 'CsapatModel')

    return function (req, res, next) {
        CsapatModel.find({}, (err, csapatok) => {
            if (err) {
                return next(err);
            }

            res.locals.csapatok = csapatok;
            return next();
        });
    }

}