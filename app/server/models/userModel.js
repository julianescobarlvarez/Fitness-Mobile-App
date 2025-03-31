import mongoose from 'mongoose'

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// Crear el modelo del usuario
const User = mongoose.model('User', userSchema)

module.exports = User
