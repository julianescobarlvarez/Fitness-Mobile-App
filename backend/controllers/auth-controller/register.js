import bcrypt from 'bcryptjs'
import User from'../../models/userModel.js'
import createAccessToken from '../../libs/jwt.js'

// Función para registrar a un nuevo usuario
const register = async (req, res) => {
    const { email, password, name, gender } = req.body

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email })
        
        // Si el correo ya existe en la base de datos, se envía una respuesta con estado 400
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' })
        }

        // Se encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Se crea un nuevo usuario
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            gender,
        })

        // Se guarda el usuario en la base de datos y le asignamos un token de acceso
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })

        // Se envia la respuesta con el token en formato json
        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error })
    }
}

export default register