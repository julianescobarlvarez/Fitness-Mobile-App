import { Router } from 'express'
import addChallenge from '../services/addChallenge.js'
import findAllChallenges from '../services/findAllChallenges.js'
import handleChallengeCompleted from '../services/handleChallengeCompleted.js'
import deleteChallengeCompleted from '../services/deleteChallengeCompleted.js'

const router = Router()

// Ruta para registrar un nuevo desafío en el sistema
router.post('/add/challenge', addChallenge)

// Ruta para otbener desafío en el sistema
router.get('/findAll/challenge', findAllChallenges)

// Ruta para bloquear los desafíos completados en el sistema
router.post('/lock/challenge', handleChallengeCompleted)

// Ruta para vaciar los desafíos completados en el sistema
router.post('/empty/values', deleteChallengeCompleted)

export default router