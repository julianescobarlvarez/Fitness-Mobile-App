import axios from "axios"

// Servicio de validación de email entrante
const deletePlanService = async (planId, email) => {
    try {    
        // Se envía una consulta al backend a través de axios
        const response = await axios.delete('http://10.0.2.2:3000/api/delete/plan', {
            params: {
                planId,
                email
            }
        })
        return response

    } catch (error) {
        console.log('Error durante la solicitud (eliminar plan):', error)
    }
}

export default deletePlanService