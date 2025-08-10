import Exercise from "../models/exerciseModel.js"

//Función para agregar ejercicios a la base de datos
const addExercise = async(req, res) => {
    const { 
        name,
        description,
        type,
        muscleGroups,
        muscle,
        level,
        sets,
        reps,
        weight,
        rest,
        typeIntensity,
        exerciseImage,
        exerciseVideo
    } = req.body
    
    try {
        // Se crea un nuevo ejercicio para la base de datos
        const newExercise = new Exercise({
            name,
            description,
            type,
            muscleGroups,
            muscle,
            level,
            sets,
            reps,
            weight,
            rest,
            typeIntensity,
            exerciseImage,
            exerciseVideo
        })

        await newExercise.save()

        // Muestra el estatus 200 que confirma una ejecución válida
        res.status(200).send({ mensaje: 'El ejercicio se registró correctamente' })
                
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el ejercicio', error })
    }
}

export default addExercise