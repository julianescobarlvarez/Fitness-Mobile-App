import axios from 'axios'

// Servicio de registro de usuario
const registerService = async(userData) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.post('http://10.0.2.2:3000/api/register', userData)
        return response

    } catch (error) {
        console.log('Error durante el registro:', error)
    }
}

export default registerService