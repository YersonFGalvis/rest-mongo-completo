const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-JWT');

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {

        //  verificar si el email existe

        const usuario = await Usuario.findOne({correo});

        if (!usuario){
            return res.status(404).json({
                message: 'Usuario / Password incorrect - Correo'
            });
        }

        // si el usuario esta activo

        if (!usuario.estado) {
            return res.status(404).json({
                message: 'Usuario / Password incorrect - estado:False'
            });
        }

        //verificar contraseña

        const validPssword = bcryptjs.compareSync(password, usuario.password);

        if (!validPssword){
            return res.status(404).json({
                message: 'Usuario / Password incorrect - Password incorrect'
            });
        }
        //generar JWT

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Hable con el administrador'
            });
    }

}   

module.exports = {
    login
}