import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import planRoutes from './routes/planRoutes.js'
import progressRoutes from './routes/progressRoutes.js'
import challengeRoutes from './routes/challengeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import path from "path";
import { fileURLToPath } from "url";

// Se crea la app de Express
const app = express()
const port = 3000

// Middleware para permitir cors en Expo
app.use(cors())
app.use(express.json())

// Conexión a la base de datos
connectDB()

// Para obtener la ruta del directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Servir imágenes desde frontend/assets
app.use("/assets", express.static(path.join(__dirname, "../frontend/assets")))

// Asignación de rutas de autenticación
app.use('/api', authRoutes)

// Asignación de rutas de gestión de ejercicios
app.use('/api', exerciseRoutes)

// Asignación de rutas de gestión de planes de entrenamiento
app.use('/api', planRoutes)

// Asignación de rutas de progresión de planes de entrenamiento
app.use('/api', progressRoutes)

// Asignación de rutas de gestión de desafíos
app.use('/api', challengeRoutes)

// Asignación de rutas de gestión de usuario
app.use('/api', userRoutes)

// Para iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})

export default app

