import axios from 'axios'

// Servicio de registro de usuario
const addWeightService = async(planId, weight) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.post('http://10.0.2.2:3000/api/add/plan/weight', {
            planId,
            weight
        })
        return response

    } catch (error) {
        console.log('Error durante el servicio de agregar nuevo peso:', error)
    }
}

export default addWeightService