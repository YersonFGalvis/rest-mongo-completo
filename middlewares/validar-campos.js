const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    //verificamos si nuestra request(req ) viene con errores que almaceno el middlewares
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //funcion que se ejecuta si el middleware pasa
    next();
}

module.exports = {
    validarCampos
}