import Plan from "../models/planModel.js"
import User from '../models/userModel.js'

//Función para encontrar encontrar el plan del usuario
const patchProgressData = async(req, res) => {
    const { planId, email } = req.body
    
    try {       
        // Se busca el plan en la base de datos
        const plan = await Plan.findById(planId)

        // Si el plan no existe, se devuelve una respuesta con mensaje de error
        if (!plan) {
            return res.status(400).send({ mensaje: 'El plan no existe' });
        }

        const user = await User.findOne(email)

        // Si el usuario no existe, se devuelve una respuesta con mensaje de error
        if (!user) {
            return res.status(400).send({ mensaje: 'El usuario no existe' });
        }

        // Se toman los valores correspondientes del plan y el usuario para trabajarlos
        const age = plan.age
        const height = plan.height
        const weightArray = plan.weeklyProgress[0].bodyWeight
        const weight = weightArray[weightArray.length - 1]

        let valueGender = 0

        // Calcular el índice de masa corporal
        const imc = (weight * 10000) / (height * height)

        // Dependiendo del género del usuario, se usa una fórmula en particular       
        if (user.gender == 'man'){
            valueGender = 1
        }
        
        // Se calcula el porcentaje de grasa corporal
        const pgc = (1.2 * imc) + (0.23 * age) - (10.8 * valueGender) - 5.4

        // Se asignan los nuevos valores de IMC y porcentaje de grasa corporal
        plan.weeklyProgress[0].bmi = imc
        plan.weeklyProgress[0].bfp = pgc

        // Se guarda el plan modificado y se retorna con un mensaje de éxito
        await plan.save()
        return res.status(200).send({ message: 'Actualización exitosa de características físicas semanal' })
                
    } catch (error) {
        res.status(400).send({ mensaje: 'Error del servidor (No se pudo actualizar las características físicas de la semana)' })
    }
}

export default patchProgressData