import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

// Crear la app de Express
const app = express()
const port = 3000;

// Middleware
app.use(cors())
app.use(express.json())  // Para parsear el cuerpo de las solicitudes en JSON

// Conectar a la base de datos
connectDB()

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes)

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})


