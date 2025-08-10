import Challenge from "../models/challengeModel.js"

//Función para encontrar encontrar los desafíos en el sistema
const findAllChallenges = async(req, res) => {

    try {
        // Se busca todos los desafíos en la base de datos
        const challenges = await Challenge.find()

        // Si ningún desafío existe, se devuelve una respuesta con mensaje de error
        if (!challenges) {
            return res.status(400).send({ mensaje: 'No existe ningún desafío' });
        }

        // Retorna el objeto de los planes encontrados como respuesta
        return res.status(200).json({ mensaje: 'Desafíos encontrados', challenges }) 
                
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor' })
    }
}

export default findAllChallenges