const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const validator = [ // Validar Usuario
    check('name')
        .exists()
        .isLength({ min: 5 })
        .not()
        .isEmpty(),
    check('apellido')
        .exists()
        .isLength({ min: 5 })
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .isEmail()
        .custom(value => {
            return User.findOne({ email: value}).then((user) => {
                if (user){
                    return Promise.reject("Email en uso");
                }
            })
        }),
    check('password')
        .exists()
        .isLength({ min: 5 })
        .not()
        .isEmpty(),
    (req, res, next ) => {
        validarCampos(req,res,next)
    }
];

module.exports = validator;