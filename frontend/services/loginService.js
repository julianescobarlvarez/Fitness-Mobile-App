import axios from 'axios'

// Servicio de inicio de sesión
const loginService = async(userData) => {
    try {
        // Se envía una consulta al backend a través de axios
        const response = await axios.post('http://10.0.2.2:3000/api/login', userData)
        return response

    } catch (error) {
        console.log('Error durante el inicio de sesión:', error)
    }
}

export default loginService