const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '') =>{

    return new Promise((resolve, reject) =>{

        //solamente ponemos en el payload
        //el id del usuario (no meter info sensible)
        const payload = { uid };

        //firmamos el token

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h'
        },(err , token) => {

            if(err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            }else{
                resolve(token);
            }
        })
    });

}

module.exports = {
    generarJWT
}