import User from "../models/userModel.js"

//Función para validar el email entrante
const validateEmail = async(req, res) => {
    const { email } = req.body
    
    try {
        // Se verifica si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email })

        // Si el usuario ya existe, se devuelve una respuesta con mensaje de error
        if (existingUser) {
            return res.status(400).send({ mensaje: 'El usuario ya existe' });
        }

        // Retorna si el usuario no existe en la base de datos, permitiendo el registro
        return res.status(200).send({ mensaje: 'El email está disponible para registrar' }) 
                
    } catch (error) {
        res.status(400).send({ mensaje: 'El usuario ya existe' })
    }
}

export default validateEmail