import pkg from 'jsonwebtoken';
const {sign} = pkg;
const generateJWT = (uid) => {
    return new Promise ((resolve, reject) => {
        const payload = { uid }
        sign(payload,process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve(token);
            }
        })
    })
}

export default generateJWT