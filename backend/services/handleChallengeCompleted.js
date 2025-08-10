//import Challenge from "../models/challengeModel.js"
import User from "../models/userModel.js"
import Challenge from '../models/challengeModel.js'

//Función para manejar el estado de desafío completado por usuario
const handleChallengeCompleted = async(req, res) => {
    const { challengeId, email } = req.body
    
    try {
        // Se busca al usuario que completó el desafío
        const user = await User.findOne({ email })
        
        // Si el usuario no existe, se envía un mensaje con el error
        if (!user) {
            return res.status(400).send({ mensaje: 'No existe el usuario' });
        }
        else {
            const challenge = await Challenge.findById(challengeId)

            if(challenge){
                if(challenge.level == 'Principiante'){
                    let count = Number(user.beginnerMedal)
                    count += 1
                    user.beginnerMedal = String(count)
                }
                else if(challenge.level == 'Intermedio'){    
                    let count = Number(user.intermediateMedal)
                    count += 1
                    user.intermediateMedal = String(count)
                }
                else{
                    let count = Number(user.advanceMedal)
                    count += 1
                    user.advanceMedal = String(count)
                }
                
                await user.save()
                
                challenge.challengeCompletedList.push(user._id)
                await challenge.save()
            }
        }

        // Muestra el estatus 200 que confirma un registro válido
        res.status(200).send({ mensaje: 'El desafío ha guardado con éxito al usuario para bloquear el desafío actual' })
                
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar al usuario en el desafío actual en el sistema', error })
    }
}

export default handleChallengeCompleted