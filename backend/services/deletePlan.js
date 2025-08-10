import User from "../models/userModel.js"
import Plan from "../models/planModel.js"

//Función para eliminar un plan seleccionado por el usuario
const deletePlan = async(req, res) => {
    const { planId, email } = req.query
    
    try {       
        //Se busca el plan por su Id y se elimina de la base de datos
        const selectedPlan = await Plan.findByIdAndDelete(planId)

        // Si el plan no existe, se devuelve una respuesta con mensaje de error
        if (!selectedPlan) {
            return res.status(400).send({ mensaje: 'El plan no existe' });
        }
        else {
            
            //Busca el plan por su Id y lo elimina del registro del usuario
            await User.updateOne(
                { email },
                { $pull: { plan: planId } }
            )
            
            // Retorna el mensaje de eliminación exitosa del plan seleccionado
            return res.status(200).send({ mensaje: 'Plan eliminado con éxito'}) 
        }
      
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor' })
    }
}

export default deletePlan