import User from "../models/userModel.js"

//Función para encontrar encontrar el plan del usuario
const findAllPlans = async(req, res) => {
    const { email } = req.query

    try {
        // Se busca al usuario en la base de datos a través de su email único
        const plans = await User.findOne({ email }).populate('plan').select('plan')

        // Si ningún plan existe, se devuelve una respuesta con mensaje de error
        if (!plans) {
            return res.status(400).send({ mensaje: 'No existe ningún plan' });
        }

        // Retorna el objeto de los planes encontrados como respuesta
        return res.status(200).json({ mensaje: 'Plan encontrado', plans }) 
                
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor' })
    }
}

export default findAllPlans