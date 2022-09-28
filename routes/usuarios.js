const { Router } = require("express");
const { check } = require('express-validator');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole
} = require('../middlewares')

const {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} = require("../controllers/usuarios");

const router = Router();

//los / se dejan vacios porque se configuran en el metodo routes del modelo

router.get("/", usuariosGet);

router.patch("/:id", usuariosPatch);

router.post("/", [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser de mas de 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost);

router.delete("/:id", [
  validarJWT,
  // esAdminRole,
  tieneRole('USER_ROLE', 'ADMIN_ROLE'),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);


router.put("/:id", [
  //check('id','No es un ID valido de mongo').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut);

module.exports = router;
