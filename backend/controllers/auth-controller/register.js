import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from'../../models/userModel.js'
import { secretKey, expiresIn } from '../../config/jwtConfig.js'

// Función para registrar a un nuevo usuario
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' })
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Crear un nuevo usuario
        const newUser = new User({
            email,
            password: hashedPassword,
        })

        // Guardar el usuario en la base de datos
        await newUser.save()

        // Crear un token JWT
        const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn })

        res.status(201).json({ message: 'Usuario registrado exitosamente', token })
    } catch (error) {
        console.error('Error al registrar usuario: ', error)
        res.status(500).json({ message: 'Error al registrar el usuario', error })
    }
}

export default registerUser//module.exports = { registerUser }