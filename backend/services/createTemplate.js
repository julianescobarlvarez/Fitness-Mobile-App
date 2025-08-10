//import Plan from "../models/planModel.js"
import Exercise from "../models/exerciseModel.js"
import addPlan from "./addPlan.js"
import User from "../models/userModel.js"

// Función para crear la plantilla del plan de entrenamiento
const createTemplate = async(req, res) => {
    const { 
        email,
        age,
        fitnessGoals, 
        muscleGoals, 
        height, 
        weight, 
        physicalLevel, 
        activityLevel, 
        trainingFrequency,
        planDuration 
    } = req.body

    let level = ''
    const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes', 'Sábado']
    // let actualDate = days[new Date().getDay()] //Me da el día de hoy
    let actualDate = new Date().getDay()
    let startDate =  new Date()
    let endDate = new Date()
    const result = []
    // let trainingPlan = [] 

    // Condicionales para definir la dificultad del plan de entrenamiento
    if (physicalLevel == 'beginner' && activityLevel == 'sedentary'){
        level = 'beginner'
    }

    else if (physicalLevel == 'beginner' && activityLevel == 'active'){
        level = 'beginner'
    }

    else if (physicalLevel == 'intermediate' && activityLevel == 'sedentary'){
        level = 'beginner'
    }

    else if (physicalLevel == 'intermediate' && activityLevel == 'active'){
        level = 'intermediate'
    }

    else if (physicalLevel == 'advanced' && activityLevel == 'sedentary'){
        level = 'intermediate'
    }

    else if (physicalLevel == 'advanced' && activityLevel == 'active'){
        level = 'advanced'
    }

    // Bucle para determinar los días de entrenamiento basados en la frecuencia de entrenamiento
    for (let i = 0; i < trainingFrequency; i++){
        const actualDay = days[actualDate % 7]
        result.push(actualDay)
        actualDate += 2
    }
    console.log('Días de entrenamiento: ',result)

    // Se ajusta la fecha de término según la duración del plan
    endDate.setDate(endDate.getDate() + (planDuration * 7))

    // Calcular el índice de masa corporal
    const imc = (weight * 10000) / (height * height)

    try {
        // Se busca el género del usuario para calcular el porcentaje de grasa corporal
        const user = await User.findOne({ email })
        let valueGender = 0
  
        // Dependiendo del género del usuario, se usa una fórmula en particular       
        if (user.gender == 'man'){
            valueGender = 1
        }
        
        // Se calcula el porcentaje de grasa corporal
        const pgc = (1.2 * imc) + (0.23 * age) - (10.8 * valueGender) - 5.4

        // Si es Cardio, se desarrolla una plantilla de cardio
        if (fitnessGoals == 'lose weight'){
            if (level == 'beginner'){
                try {
                    // Se buscan los ejercicios que sean exclusivamente de cardio LISS
                    const cardioExercisesLISS = await Exercise.find({ type: 'cardio', level }).limit(5)

                    // Se registran las características de los ejercicios en los días de entrenamiento
                    const trainingPlan = result.map(day => ({
                        day: day,
                        exercises: cardioExercisesLISS.map(ex => ({
                            name: ex.name,
                            duration: 180,
                            exerciseImage: ex.exerciseImage,
                            exerciseVideo: ex.exerciseVideo
                        })),
                        rounds: 2,
                        restExercise: 3,
                        restSets: 60
                    }))

                    // Se crea el objeto plan de nombre data
                    const data = {
                        name: 'Plan Cardio - LISS',
                        age: age,
                        height: height,
                        level: 'Principiante',
                        fitnessGoals: 'Bajar de peso',
                        planIntensity: ['LISS'],
                        trainingFrequency: trainingFrequency,
                        planDuration: planDuration,
                        startDate: startDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                        endDate: endDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                        weeklyProgress: [{
                            week: 1,
                            bodyWeight: [weight],
                            bmi: imc,
                            bfp: pgc
                        }],
                        trainingDays: trainingPlan
                    }

                    const response = await addPlan(data)
                    console.log('Respuesta de envío (LISS): ', JSON.stringify(response.plan, null, 2))
                    
                    const response2 = response.plan

                    // Guardamos el plan del usuario
                    user.plan.push(response2._id)
                    await user.save()

                    return res.status(201).json({ message: 'Se creo el plan con éxito', response2, result })

                } catch (error) {
                    res.status(400).send({ message: 'Ocurrió un error al buscar los ejercicios de cardio' })
                }
            }
            else if (level == 'intermediate'){
                try {
                    // Se buscan los ejercicios que sean exclusivamente de cardio MICT y MIIT
                    const cardioExercisesMICT = await Exercise.find({ type: 'cardio', level, typeIntensity: 'MICT' }).limit(5)
                    const cardioExercisesMIIT = await Exercise.find({ type: 'cardio', level, typeIntensity: 'MIIT' }).limit(5)

                    // Se registran las características de los ejercicios en los días de entrenamiento
                    const trainingPlan = result.map((day, index) => {
                        const isMICT = index % 2 === 0
                        const selectedExercises = isMICT ? cardioExercisesMICT : cardioExercisesMIIT

                        // Atributos variables
                        const rounds = 3
                        const restExercise = isMICT ? 3 : 15 // Ejemplo: MICT = 3s, MIIT = 15s
                        const restSets = isMICT ? 3 : 60   // Ejemplo: MICT = 3s, MIIT = 45s
                        const duration = isMICT ? 120 : 45

                        return {
                            day,
                            exercises: selectedExercises.map(ex => ({
                                name: ex.name,
                                duration: duration,
                                exerciseImage: ex.exerciseImage,
                                exerciseVideo: ex.exerciseVideo
                            })),
                            rounds,
                            restExercise,
                            restSets
                        }
                    })

                    let planIntensity = []
                    let planName = ''

                    if(trainingFrequency == 1){
                        planIntensity = ['MICT']
                        planName = 'Plan Cardio - MICT'
                    } else {
                        planIntensity = ['MICT', 'MIIT']
                        planName = 'Plan Cardio - MICT y MIIT'
                    }

                    // Se crea el objeto plan de nombre data
                    const data = {
                        name: planName,
                        age: age,
                        height: height,
                        level: 'Intermedio',
                        fitnessGoals: 'Bajar de peso',
                        planIntensity: planIntensity,
                        trainingFrequency: trainingFrequency,
                        planDuration: planDuration,
                        startDate: startDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                        endDate: endDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                        weeklyProgress: [{
                            week: 1,
                            bodyWeight: weight,
                            bmi: imc,
                            bfp: pgc
                        }],
                        trainingDays: trainingPlan
                    }
                    
                    const response = await addPlan(data)
                    console.log('Respuesta de envío (MICT y MIIT): ', JSON.stringify(response.plan, null, 2))
                    const response2 = response.plan

                    // Guardamos el plan del usuario
                    user.plan.push(response2._id)
                    await user.save()

                    return res.status(201).json({ message: 'Se creo el plan con éxito', response2, result })
                
                } catch (error) {
                    res.status(400).send({ message: 'Ocurrió un error al buscar los ejercicios de cardio' })
                }
            }
            else if (level == 'advanced'){
                try {
                    // Se buscan los ejercicios que sean exclusivamente de cardio HIIT
                    const cardioExercisesHIIT = await Exercise.find({ type: 'cardio', level }).limit(16)
                
                    // Se registran las características de los ejercicios en los días de entrenamiento
                    const trainingPlan = result.map(day => ({
                        day: day,
                        exercises: cardioExercisesHIIT.map(ex => ({
                            name: ex.name,
                            duration: 40,
                            exerciseImage: ex.exerciseImage,
                            exerciseVideo: ex.exerciseVideo
                        })),
                        rounds: 4,
                        restExercise: 20,
                        restSets: 60
                    }))

                    // Se crea el objeto plan de nombre data
                    const data = {
                        name: 'Plan Cardio - HIIT',
                        age: age,
                        height: height,
                        level: 'Avanzado',
                        fitnessGoals: 'Bajar de peso',
                        planIntensity: ['HIIT'],
                        trainingFrequency: trainingFrequency,
                        planDuration: planDuration,
                        startDate: startDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                        endDate: endDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                        weeklyProgress: [{
                            week: 1,
                            bodyWeight: weight,
                            bmi: imc,
                            bfp: pgc
                        }],
                        trainingDays: trainingPlan
                    }

                    const response = await addPlan(data)
                    console.log('Respuesta de envío (HIIT): ', JSON.stringify(response.plan, null, 2))
                    const response2 = response.plan

                    // Guardamos el plan del usuario
                    user.plan.push(response2._id)
                    await user.save()

                    return res.status(201).json({ message: 'Se creo el plan con éxito', response2, result })

                } catch (error) {
                    res.status(400).send({ message: 'Ocurrió un error al buscar los ejercicios de cardio' })
                }
            }
        }

        // Si es Hipertrofia, se desarrolla una plantilla de hipertrofia
        else if (fitnessGoals == 'muscle mass'){
            try {
                let allHypertrophyExercises = []
                let allStretchingExercises = []

                // Se traduce los valores del atributo level
                if(level == 'beginner'){
                    level = 'Principiante'
                }
                else if(level == 'intermediate'){
                    level = 'Intermedio'
                }
                else{
                    level = 'Avanzado'
                }

                // Filtra los ejercicios respecto a su grupo muscular, tipo y músculo
                if(muscleGoals.includes("arms")){
                    const armsBicepsHypertrophyExercises = await Exercise.find({
                        type: 'hypertrophy',
                        muscleGroups: 'arms',
                        muscle: "biceps brachii"
                    }).limit(3)
                    const armsTricepsHypertrophyExercises = await Exercise.find({ 
                        type: 'hypertrophy',
                        muscleGroups: 'arms',
                        muscle: "triceps brachii"
                    }).limit(3)
                    allHypertrophyExercises.push(
                        ...armsBicepsHypertrophyExercises, 
                        ...armsTricepsHypertrophyExercises
                    )
                    
                    //Filtra los estiramientos por grupo muscular
                    const armsStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'arms',
                    })
                    allStretchingExercises.push(
                        ...armsStretchingExercises
                    )
                }
                if(muscleGoals.includes("chest")){
                    const chestHypertrophyExercises = await Exercise.find({ 
                        type: 'hypertrophy', 
                        muscleGroups: 'chest'
                    }).limit(3)
                    allHypertrophyExercises.push(...chestHypertrophyExercises)

                    //Filtra los estiramientos por grupo muscular
                    const chestStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'chest',
                    })
                    allStretchingExercises.push(
                        ...chestStretchingExercises
                    )
                }
                if(muscleGoals.includes("legs")){
                    const legsHypertrophyExercises = await Exercise.find({ 
                        type: 'hypertrophy',
                        muscleGroups: 'legs'
                    }).limit(4)
                    allHypertrophyExercises.push(...legsHypertrophyExercises)

                    //Filtra los estiramientos por grupo muscular
                    const legsStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'legs',
                    })
                    allStretchingExercises.push(
                        ...legsStretchingExercises
                    )
                }

                // Se registran las características de los ejercicios en los días de entrenamiento
                const trainingPlan = result.map(day => ({
                    day: day,
                    exercises: allHypertrophyExercises.map(ex => ({
                        name: ex.name,
                        sets: ex.sets,
                        reps: ex.reps,
                        weight: ex.weight,
                        rest: ex.rest,
                        muscleGroup: [
                            Array.isArray(ex.muscleGroups) ? ex.muscleGroups[0] : ex.muscleGroups,
                            //Array.isArray(ex.muscle) ? ex.muscle[0] : ex.muscle
                        ],
                        exerciseImage: ex.exerciseImage,
                        exerciseVideo: ex.exerciseVideo
                    })),
                }))             

                // Se registran las características de los ejercicios de estiramiento
                const stretchingExercises = allStretchingExercises.map(ex => ({
                    name: ex.name,
                    rest: ex.rest,
                    exerciseVideo: ex.exerciseVideo
                }))

                // Se crea el objeto plan de nombre data
                const data = {
                    name: 'Plan Hipertrofia',
                    age: age,
                    height: height,
                    level: level,
                    fitnessGoals: 'Ganancia muscular',
                    muscleGoals: muscleGoals,
                    trainingFrequency: trainingFrequency,
                    planDuration: planDuration,
                    startDate: startDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                    endDate: endDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                    weeklyProgress: [{
                        week: 1,
                        bodyWeight: weight,
                        bmi: imc,
                        bfp: pgc
                    }],
                    trainingDays: trainingPlan,
                    stretchingExercises: stretchingExercises
                }

                const response = await addPlan(data)
                console.log('Respuesta de envío (Hipertrofia): ', JSON.stringify(response.plan, null, 2))
                const response2 = response.plan
                
                // Guardamos el plan del usuario
                user.plan.push(response2._id)
                await user.save()
                
                return res.status(201).json({ message: 'Se creo el plan con éxito', response2, result })

            } catch (error) {
                res.status(400).send({ message: 'Ocurrió un error al buscar los ejercicios de hipertrofia' })
            }    
        }

        // Si es Calistenia, se desarrolla una plantilla de calistenia
        else if (fitnessGoals == 'be strong'){
            try {
                let allCalisthenicsExercises = []
                let allStretchingExercises = []

                if(level == 'beginner'){
                    level = 'Principiante'
                }
                else if(level == 'intermediate'){
                    level = 'Intermedio'
                }
                else{
                    level = 'Avanzado'
                }
                
                if(muscleGoals.includes("arms")){
                    const armsCalisthenicsExercises = await Exercise.find({ 
                        type: 'calisthenics', 
                        muscleGroups: 'arms' 
                    }).limit(3)
                    allCalisthenicsExercises.push(
                        ...armsCalisthenicsExercises 
                    )

                    //Filtra los estiramientos por grupo muscular
                    const armsStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'arms',
                    })
                    allStretchingExercises.push(
                        ...armsStretchingExercises
                    )
                }
                if(muscleGoals.includes("chest")){
                    const chestCalisthenicsExercises = await Exercise.find({ 
                        type: 'calisthenics', 
                        muscleGroups: 'chest' 
                    }).limit(3)
                    allCalisthenicsExercises.push(
                        ...chestCalisthenicsExercises 
                    )

                    //Filtra los estiramientos por grupo muscular
                    const chestStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'chest',
                    })
                    allStretchingExercises.push(
                        ...chestStretchingExercises
                    )
                }
                if(muscleGoals.includes("abs")){
                    const absCalisthenicsExercises = await Exercise.find({ 
                        type: 'calisthenics', 
                        muscleGroups: 'abs' 
                    }).limit(3)
                    allCalisthenicsExercises.push(
                        ...absCalisthenicsExercises 
                    )

                    //Filtra los estiramientos por grupo muscular
                    const absStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'abs',
                    })
                    allStretchingExercises.push(
                        ...absStretchingExercises
                    )
                }
                if(muscleGoals.includes("legs")){
                    const legsCalisthenicsExercises = await Exercise.find({ 
                        type: 'calisthenics', 
                        muscleGroups: 'legs' 
                    }).limit(4)
                    allCalisthenicsExercises.push(
                        ...legsCalisthenicsExercises 
                    )

                    //Filtra los estiramientos por grupo muscular
                    const legsStretchingExercises = await Exercise.find({
                        type: 'stretching',
                        muscleGroups: 'legs',
                    })
                    allStretchingExercises.push(
                        ...legsStretchingExercises
                    )
                }
                const trainingPlan = result.map(day => ({
                    day: day,
                    exercises: allCalisthenicsExercises.map(ex => ({
                        name: ex.name,
                        sets: ex.sets,
                        ...(ex.reps !== undefined && { reps: ex.reps }),
                        ...(ex.reps === undefined && { duration: 45 }),
                        muscleGroup: Array.isArray(ex.muscleGroups) ? ex.muscleGroups[0] : ex.muscleGroups,
                        exerciseImage: ex.exerciseImage,
                        exerciseVideo: ex.exerciseVideo
                    })),
                    restExercise: 60,
                    restSets: 60
                }))

                // Se registran las características de los ejercicios de estiramiento
                const stretchingExercises = allStretchingExercises.map(ex => ({
                    name: ex.name,
                    rest: ex.rest,
                    exerciseVideo: ex.exerciseVideo
                }))

                // Se crea el objeto plan de nombre data
                const data = {
                    name: 'Plan Calistenia',
                    age: age,
                    height: height,
                    level: level,
                    fitnessGoals: 'Ganancia de fuerza',
                    muscleGoals: muscleGoals,
                    trainingFrequency: trainingFrequency,
                    planDuration: planDuration,
                    startDate: startDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                    endDate: endDate.toLocaleDateString('es-CL').replace(/-/g, '/'),
                    weeklyProgress: [{
                        week: 1,
                        bodyWeight: weight,
                        bmi: imc,
                        bfp: pgc
                    }],
                    trainingDays: trainingPlan,
                    stretchingExercises: stretchingExercises
                }
                const response = await addPlan(data)
                console.log('Respuesta de envío (Calistenia): ', JSON.stringify(response.plan, null, 2))
                const response2 = response.plan
                
                // Guardamos el plan del usuario
                user.plan.push(response2._id)
                await user.save()
                
                return res.status(201).json({ message: 'Se creo el plan con éxito', response2, result })

            } catch (error) {
                res.status(400).send({ message: 'Ocurrió un error al buscar los ejercicios de calistenia' }) 
            }
        }
    } catch (error) {
        return res.status(400).send({ message: 'Ocurrió un error al buscar los ejercicios de cardio' })
    }
}

export default createTemplate