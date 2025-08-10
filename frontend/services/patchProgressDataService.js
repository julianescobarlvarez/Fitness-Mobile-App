import axios from 'axios'

// Servicio de registro de usuario
const patchProgressDataService = async(planId, email) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.patch('http://10.0.2.2:3000/api/patch/plan/progressBmiBfp', {
            planId,
            email
        })
        return response

    } catch (error) {
        console.log('Error durante el servicio de actualización del progreso (IMC y PGC):', error)
    }
}

export default patchProgressDataService