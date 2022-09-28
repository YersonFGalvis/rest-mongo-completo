const { response, request } = require("express"); //opcional es para que al escribir autocomplete 
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');



const usuariosGet = async (req = request, res = response) => {

  //capturar todas las query ej ?q=1&sexo=M etc
  // const query = req.query;

  //desestructurar para obtener solo las query que me interesan

  // const { q, sexo } = req.query
  const { limit = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limit));

  // const total = await Usuario.countDocuments(query);

  //coleccion de las 2 promesas, que disminuye el tiempo de ejecucion y hasta que no
  //se resuelvan las promesas que incluya no pasara al res.json

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limit))

  ])

  res.json({
    total,
    usuarios
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
const usuariosDelete = async (req, res = response) => {

  const {id} = req.params;

  //esto viene del middleware validar-jwt
    // const uid = req.uid;
  // const UsuarioAutenticado = req.usuarioAuth;

  //borrar el registro completamente
  //const usuario = await Usuario.findByIdAndDelete(id);

  //actualizar su estado de activo a false 

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true })

  res.json({
    usuario,
    // UsuarioAutenticado
  });



}
const usuariosPut = async (req, res = response) => {

  const { id } = req.params;
  //extraemos los posibles argumentos que pueda mandar el usuario
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra BD

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    usuario
  });

}

module.exports = {

  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut

}