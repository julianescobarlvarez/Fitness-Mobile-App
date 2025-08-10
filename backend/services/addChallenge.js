import Challenge from "../models/challengeModel.js"

//Función para agregar ejercicios a la base de datos
const addChallenge = async(req, res) => {
    const { 
        name,
        description,
        level
    } = req.body
    
    try {
        // Se crea un nuevo desafío para la base de datos
        const newChallenge = new Challenge({
            name,
            description,
            level
        })

        await newChallenge.save()

        // Muestra el estatus 200 que confirma un registro válido
        res.status(200).send({ mensaje: 'El desafío se registró correctamente' })
                
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el desafío al sistema', error })
    }
}

export default addChallenge