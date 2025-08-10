import mongoose from 'mongoose'

// Se define el esquema de los planes de entrenamiento
const planSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    },
    level: {
        type: String
    },
    fitnessGoals: {
        type: String
    },
    muscleGoals: [String],
    planIntensity: {
        type: [String],
        enum: ['LISS','MICT', 'MIIT', 'HIIT']
    },
    trainingFrequency: {
        type: Number
    },
    planDuration: {
        type: Number
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    weeklyProgress: [{
        week: {
            type: Number
        },
        bodyWeight: {
            type: [Number]
        },
        bmi: {
            type: Number
        },
        bfp: {
            type: Number
        },
        _id: false
    }],
    trainingDays: [{
        day: {
            type: String
        },
        exercises: [{
            name: {
                type: String
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            },
            weight: {
                type: Number
            },
            rest: {
                type: Number
            },
            duration: {
                type: Number
            },
            muscleGroup: [String],
            exerciseImage: {
                type: String,
            },
            exerciseVideo: {
                type: String,
            },
            _id: false
        }],
        rounds: {
            type: Number
        },
        restExercise: {
            type: Number
        },
        restSets: {
            type: Number
        },
        _id: false
    }],
    stretchingExercises: [{
        name: {
            type: String
        },
        rest: {
            type: Number
        },
        exerciseVideo: {
            type: String,
        },
        _id: false
    }]

})

// Se crea el modelo del plan y se exporta
export default mongoose.model('Plan', planSchema)