import { Router } from 'express'
import findUser from '../services/findUser.js'

const router = Router()

// Ruta para encontrar el usuario en la base de datos
router.get('/find/user/id', findUser)

export default router