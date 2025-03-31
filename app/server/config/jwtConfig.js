require('dotenv').config() // Esto carga las variables de entorno del archivo .env

const jwtConfig = {
    secretKey: process.env.SECRET_KEY, // Usar la variable de entorno
    expiresIn: '1h',
}

export default jwtConfig

