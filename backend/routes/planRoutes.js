import { Router } from 'express'
import addPlan from '../services/addPlan.js'
import createTemplate from '../services/createTemplate.js'
import findPlan from '../services/findPlan.js'
import findAllPlans from '../services/findAllPlans.js'
import deletePlan from '../services/deletePlan.js'
import patchPlan from '../services/patchPlan.js'

const router = Router()

// Ruta para registrar un nuevo usuario
router.post('/add/plan', addPlan)

//Ruta para crear la plantilla
router.post('/createTemplate', createTemplate)

//Ruta para buscar el plan del usuario
router.get('/find/plan', findPlan)

//Ruta para buscar todos los planes del usuario
router.get('/findAll/plan', findAllPlans)

//Ruta para eliminar planes del usuario
router.delete('/delete/plan', deletePlan)

//Ruta para actualizar valores del plan del usuario
router.patch('/patch/plan', patchPlan)

export default router