import Plan from "../models/planModel.js"

const addWeight = async(req, res) => {
    const { planId, weight} = req.body

    try {
        // Se busca el plan en la base de datos
        const plan = await Plan.findById(planId)

        // Si el plan no existe, se devuelve una respuesta con mensaje de error
        if (!plan) {
            return res.status(400).send({ mensaje: 'El plan no existe' });
        }

        const actualWeek = plan.weeklyProgress[0].week

        // Se guarda el plan con este nuevo dato y se retorna con un mensaje de éxito
        plan.weeklyProgress[0].bodyWeight[actualWeek-1] = weight
        //plan.weeklyProgress[0].bodyWeight.pop()

        await plan.save()
        return res.status(200).send({ message: 'Actualización exitosa' })
                
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el ejercicio', error })
    }
}

export default addWeight