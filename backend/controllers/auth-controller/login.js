import bcrypt from 'bcryptjs'
import User from '../../models/userModel.js'
import createAccessToken from '../../libs/jwt.js'

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Aquí se valida las credenciales del usuario con la base de datos
        const userFound = await User.findOne({ email })

        // Si el usuario no es encontrado, se envía una respuesta con estado 400
        if (!userFound) {
            return res.status(400).json({ message: "El usuario no ha sido encontrado" })
        }

        // Se compara la contraseña de entrada con la registrada en la base de datos
        const isMatch = await bcrypt.compare(password, userFound.password)

        // Si las contraseñas son incorrectas, se envía una respuesta con estado 400
        if (!isMatch){
            return res.status(400).json({ message: "Credenciales incorrectas" })
        }

        // Se le asigna un token de acceso
        const token = await createAccessToken({ id: userFound._id })

        // Se envía una respuesta en formato json con el token
        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error })
    }
};

export default login