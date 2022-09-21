const Role = require('../models/role');
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

//verificar si el correo existe
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`)
    }
}

// const existeUsuarioPorId = async (id = '') => {
//     const existeID = await Usuario.findById(id);
//     if (!existeID) {
//         throw new Error(`El ID ${id} no se encuentra registrado en la BD`)
//     }
// }

const existeUsuarioPorId = async( id ) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById(id).exec();
        if ( !existeUsuario ) {
            throw new Error(`El id ${ id } no existe`);
        }
    } else {
        throw new Error(`${ id } no es un ID válido de Mongo`);
    }
};


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
};