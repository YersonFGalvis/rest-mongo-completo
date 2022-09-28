const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {

    //req.usuarioAuth se definio en el middleware validar-jwt
    if (!req.usuarioAuth) {
        return res.status(500).json({
            msg: ' Token sin validar, validelo primero antes de verificar el Rol'
        });
    }


    const { rol, nombre } = req.usuarioAuth

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: `${nombre} no es administrador - Accion no permitida `
        });
    }
    next();
};

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {

        //req.usuarioAuth se definio en el middleware validar-jwt
        if (!req.usuarioAuth) {
            return res.status(500).json({
                msg: ' Token sin validar, validelo primero antes de verificar el Rol'
            });
        }

        if (!roles.includes(req.usuarioAuth.rol)) {
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles ${roles} su rol es ${req.usuarioAuth.rol}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}