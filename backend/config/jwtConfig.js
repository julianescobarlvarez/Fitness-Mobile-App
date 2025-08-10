// Esto carga las variables de entorno del archivo .env
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY

export default secretKey

