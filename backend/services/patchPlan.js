import Plan from "../models/planModel.js"

//Función para encontrar encontrar el plan del usuario
const patchPlan = async(req, res) => {
    const {
        planId,
        day,
        exerciseName,
        updatedData
    } = req.body
    
    try {       
        // Se busca el plan en la base de datos
        const plan = await Plan.findById(planId)

        // Si el plan no existe, se devuelve una respuesta con mensaje de error
        if (!plan) {
            return res.status(400).send({ mensaje: 'El plan no existe' });
        }

        // Si el atributo día existe, se utiliza para buscar los ejercicios en cuestión
        const dayObj = plan.trainingDays.find(d => d.day === day)
        if (!dayObj){
            return res.status(404).json({ error: 'Día no encontrado' })
        }

        // Si se incluye exerciseName, se actualiza el ejercicio en cuestión
        if (exerciseName){
            const exercise = dayObj.exercises.find(e => e.name === exerciseName)
            if (!exercise){
                return res.status(404).json({ error: 'Ejercicio no encontrado' })
            }

            Object.entries(updatedData).forEach(([key, value]) => {
                if(key in exercise){
                    exercise[key] = value
                }
            })

            //Object.entries(updatedData).forEach(([key, value]) => {
            //    if(key in exercise){
            //        exercise.set(key, undefined)
            //    }
            //})

        } else {
            // Si no hay exerciseName, asumimos que se quiere actualizar propiedades del día
            Object.entries(updatedData).forEach(([key, value]) => {
                if (key in dayObj){
                    dayObj[key] = value
                }
            })
        }

        // Se guarda el plan modificado y se retorna con un mensaje de éxito
        await plan.save()
        return res.status(200).send({ message: 'Actualización exitosa' })
                
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor (No se pudo actualiza el plan)' })
    }
}

export default patchPlan