import axios from "axios"

// Servicio de validación de email entrante
const findAllChallengesService = async () => {
    try {    
        // Se envía una consulta al backend a través de axios
        const response = await axios.get("http://10.0.2.2:3000/api/findAll/challenge")
        return response.data

    } catch (error) {
        console.log('Error al consultar la base de datos:', error)
    }
}

export default findAllChallengesService