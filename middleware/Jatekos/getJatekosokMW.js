/* Load all jatekos from the datebase
* The result is saved to res.locals.jatekosok
*/

const requireOption = require("../requireOption");


module.exports = function(objectrepository){
    const JatekosModel = requireOption(objectrepository, 'JatekosModel');
    return function (req,res,next){
        JatekosModel.find({}).populate("_csapat").exec((err,jatekosok) => {
            if(err){
                return next(err);
            }
            res.locals.jatekosok = jatekosok;
            return next();
        })
    };
}