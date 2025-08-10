import axios from 'axios'

// Servicio de registro de usuario
const patchPlanService = async(planId, day, exerciseName, updatedData) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.patch('http://10.0.2.2:3000/api/patch/plan', {
            planId,
            day,
            exerciseName,
            updatedData
        })
        return response

    } catch (error) {
        console.log('Error durante el servicio de actualización del plan:', error)
    }
}

export default patchPlanService