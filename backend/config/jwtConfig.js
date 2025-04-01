// Esto carga las variables de entorno del archivo .env
import dotenv from 'dotenv'
dotenv.config()

export const secretKey = process.env.SECRET_KEY
export const expiresIn = '1h'

