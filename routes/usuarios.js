const { Router } = require("express");
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} = require("../controllers/usuarios");


//los / se dejan vacios porque se configuran en el metodo routes del modelo

router.get("/", usuariosGet);

router.patch("/:id", usuariosPatch);

router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6}),
  check('correo', 'El correo no es valido').isEmail(),
  check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  validarCampos
],
 usuariosPost);

router.delete("/", usuariosDelete);


router.put("/", usuariosPut);

module.exports = router;
