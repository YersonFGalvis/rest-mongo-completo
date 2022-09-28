const { response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");

const validarJWT = async(req = request , res = response, next) => {

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({ 
            message   : ' No hay Token en la peticion ' 
        });  
    }

    try {

        const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        
        //creamos un nuevo req con el uid del usuario con el token valido
        //esta req va a llegar hasta el ultimo validador de la ruta
        // req.uid = uid;

        //creamos un nuevo req con toda la info del usuario con el token valido
        //esta req va a llegar hasta el ultimo validador de la ruta
        const UsuarioAutenticado = await Usuario.findOne({ uid });

        //verificar que el usuario exista

        if (!UsuarioAutenticado){
            return res.status(401).json({
                   mesagge: 'El usuario no existe' 
                }); 
        }

        //verificar que el usuario este activo

        if (!UsuarioAutenticado.estado){
            return res.status(401).json({
                   mesagge: 'Usuario Inactivo' 
                }); 
        }

        req.usuarioAuth = UsuarioAutenticado;

        next();

    } catch (error) {
        
        console.error(error);
        res.status(401).json({ 
            message  : 'Token no valido'
        });


    }

    

    
}


module.exports = {
    validarJWT
}