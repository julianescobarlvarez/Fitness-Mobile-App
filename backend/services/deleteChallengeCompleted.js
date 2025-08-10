import Challenge from "../models/challengeModel.js"
import User from "../models/userModel.js"

//Función para eliminar un plan seleccionado por el usuario
const deleteChallengeCompleted = async(req, res) => {
    const { challengeId, email } = req.body
    
    try {       
        //Se busca el desafío por su Id
        const challenge = await Challenge.findById(challengeId)

        // Si el desafío no existe, se devuelve una respuesta con mensaje de error
        if (!challenge) {
            return res.status(400).send({ mensaje: 'El desafío no existe' });
        }
        else {
            
            const user = await User.findOne({email})

            // Si el usuario no existe, se devuelve una respuesta con mensaje de error
            if(!user){
                return res.status(400).send({ mensaje: 'El usuario no existe' });
            }
            else{
                challenge.challengeCompletedList = []
                user.beginnerMedal = "0"
                user.intermediateMedal = "0"
                user.advanceMedal = "0"

                await challenge.save()
                await user.save()
            }
      
            // Retorna el mensaje de eliminación exitosa del plan seleccionado
            return res.status(200).send({ mensaje: 'Lista vacía y medallas restauradas a 0'}) 
        }
      
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor' })
    }
}

export default deleteChallengeCompleted