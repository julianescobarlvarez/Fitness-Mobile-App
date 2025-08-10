import axios from "axios"

// Servicio de validación de email entrante
const validateEmailService = async (emailData) => {
    try {    
        // Se envía una consulta al backend a través de axios
        const response = await axios.post('http://10.0.2.2:3000/api/validateEmail', emailData)
        return response

    } catch (error) {
        console.log('Error durante el registro:', error)
    }
}

export default validateEmailService