import mongoose from 'mongoose'

// Se define el esquema de los ejercicios
const exerciseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
    },
    type: {
        type: [String],
        enum: ['calisthenics', 'hypertrophy', 'stretching', 'cardio'],
        required: true,
    },
    muscleGroups: [String],
    muscle: [String],
    level: {
        type: [String],
        enum: ['beginner', 'intermediate', 'advanced'],
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
    typeIntensity: {
        type: [String],
        enum: ['MICT', 'MIIT']
    },
    exerciseImage: {
        type: String,
        required: true,
    },
    exerciseVideo: {
        type: String,
        required: true,
    },
})

// Se crea el modelo del ejercicio y se exporta
export default mongoose.model('Exercise', exerciseSchema)