import User from "../models/userModel.js"

//Función para encontrar encontrar al usuario
const findUser = async(req, res) => {
    const { email } = req.query
    
    try {
        // Se busca el usuario en la base de datos
        const user = await User.findOne({email})

        // Si el usuario no existe, se devuelve una respuesta con mensaje de error
        if (!user) {
            return res.status(400).send({ mensaje: 'El usuario no existe' });
        }

        // Retorna el id del usuario encontrado como respuesta
        return res.status(200).json({ mensaje: 'Plan encontrado', user }) 
                
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor' })
    }
}

export default findUser