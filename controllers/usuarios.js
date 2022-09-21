const { response, request } = require("express"); //opcional es para que al escribir autocomplete 
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");



const usuariosGet = (req = request, res = response) => {

  //capturar todas las query ej ?q=1&sexo=M etc
  const query = req.query;

  //desestructurar para obtener solo las query que me interesan

  const { q, sexo } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    sexo
  });

}

const usuariosPost = async (req, res = response) => {


  //para obtener todos los datos
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //para solo rescatar los que me interesan
  //const { nombre, edad} = req.body;

 
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //guardar en BD
  await usuario.save();

  res.json({
    usuario
  });

}
const usuariosPatch = (req, res = response) => {

  //el id que pido por la ruta
  const id = req.params.id;
  res.json({
    msg: "patch API - controlador",
    id
  });

}
const usuariosDelete = (req, res = response) => {

  res.json({
    msg: "delete API - controlador"
  });

}
const usuariosPut = (req, res = response) => {

  res.json({
    msg: "put API - controlador"
  });

}

module.exports = {

  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut

}