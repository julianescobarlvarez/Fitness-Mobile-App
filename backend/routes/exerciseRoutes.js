import { Router } from 'express'
import addExercise from '../services/addExercise.js'

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/add/exercise', addExercise)

export default router