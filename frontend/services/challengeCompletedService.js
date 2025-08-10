import axios from 'axios'

// Servicio de bloqueo de desafío completado
const challengeCompletedService = async(challengeId, email) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.post('http://10.0.2.2:3000/api/lock/challenge', {
            challengeId,
            email
        })
        return response

    } catch (error) {
        console.log('Error durante el servicio de desafío completado:', error)
    }
}

export default challengeCompletedService