import axios from 'axios'

// Servicio de registro de usuario
const createPlanService = async(planData) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.post('http://10.0.2.2:3000/api/createTemplate', planData)
        return response

    } catch (error) {
        console.log('Error durante el servicio de creación de plan:', error)
    }
}

export default createPlanService