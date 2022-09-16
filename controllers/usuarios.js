const { response , request } = require("express"); //opcional es para que al escribir autocomplete 

const usuariosGet = (req = request, res = response) => {

    //capturar todas las query ej ?q=1&sexo=M etc
    const query = req.query;

    //desestructurar para obtener solo las query que me interesan

    const { q,sexo } = req.query;

    res.json({
    msg: "get API - controlador",
    q,
    sexo
    });

}
const usuariosPost = (req, res = response) => {
  
  //para obtener todos los datos
  const body = req.body; 

  //para solo rescatar los que me interesan
  const { nombre, edad} = req.body;

  res.json({
    msg: "post API - controlador",
    body, //esto es igual que decir body = body
    nombre,
    edad
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