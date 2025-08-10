import { Router } from 'express'
import controllers from '../controllers/auth-controller/index.js'
import validateEmail from '../services/validateEmail.js'

const { register, login } = controllers
const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/register', register)

//Ruta para loguear al usuario
router.post('/login', login)

//Ruta para validar el email de un usuario
router.post('/validateEmail', validateEmail)

export default router
