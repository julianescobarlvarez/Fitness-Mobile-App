import jwt from 'jsonwebtoken'
import secretKey from '../config/jwtConfig.js'

//Función para crear el token con jsonwebtoken
function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secretKey,
            (err, token) => {
                if (err) 
                    reject(err)
                resolve(token)
            }
        )
    })
}

export default createAccessToken