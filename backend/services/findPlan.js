import Plan from "../models/planModel.js"

//Función para encontrar encontrar el plan del usuario
const findPlan = async(req, res) => {
    const { planId } = req.query
    
    try {
        // Se busca el plan en la base de datos
        const actualPlan = await Plan.findById(planId)

        // Si el plan no existe, se devuelve una respuesta con mensaje de error
        if (!actualPlan) {
            return res.status(400).send({ mensaje: 'El plan no existe' });
        }

        // Retorna el objeto del plan encontrado como respuesta
        return res.status(200).json({ mensaje: 'Plan encontrado', actualPlan }) 
                
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor' })
    }
}

export default findPlan