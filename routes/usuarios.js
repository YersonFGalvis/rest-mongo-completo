const { Router } = require("express");
const router = Router();
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

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);


router.put("/", usuariosPut);

module.exports = router;
