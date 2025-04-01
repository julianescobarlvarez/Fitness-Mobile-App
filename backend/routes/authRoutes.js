//Importación de express y modulos login y register
import express from 'express'
import { loginUser, registerUser } from '../controllers/auth-controller/index.js'

const router = express.Router()

//Ruta para loguear al usuario
router.post('/login', loginUser)

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser)

export default router//module.exports = router
