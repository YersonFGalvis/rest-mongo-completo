const { Router } = require("express");
const { check } = require('express-validator');

const {login} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
validarCampos // middleware que recoje todas las excepciones del check, por eso esta al final
],login );


module.exports = router;