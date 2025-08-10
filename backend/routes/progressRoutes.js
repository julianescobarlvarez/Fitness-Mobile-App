import { Router } from 'express'
import addWeight from '../services/addWeight.js'
import patchProgressData from '../services/patchProgressData.js'

const router = Router()

// Ruta para registrar un nuevo peso semanal del usuario
router.post('/add/plan/weight', addWeight)

// Ruta para actualizar los datos del progreso (IMC y PGC)
router.patch('/patch/plan/progressBmiBfp', patchProgressData)

export default router