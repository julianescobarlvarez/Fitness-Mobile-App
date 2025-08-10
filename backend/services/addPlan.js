import Plan from "../models/planModel.js"

//Función para crear planes de entrenamiento y guardarlas en la base de datos
const addPlan = async(data) => {
    try {
        // Se crea un nuevo plan para la base de datos
        const newPlan = new Plan(data)
        const savedPlan = await newPlan.save()

        return {
            success: true,
            message: 'El plan se registró correctamente',
            plan: savedPlan
        }
                
    } catch (error) {
        return {
            success: false,
            message: 'Error al registrar el plan',
            error: error.message
        }
    }
}

export default addPlan