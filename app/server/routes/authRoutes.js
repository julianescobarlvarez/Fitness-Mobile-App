import express from 'express'

const { registerUser } = require('../controllers/authController')

const router = express.Router()

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser)

module.exports = router
