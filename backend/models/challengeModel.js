import mongoose from 'mongoose'

// Se define el esquema del desafío
const challengeSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
    },
    level: {
        type: String,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
    },
    challengeCompletedList: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
})

// Se crea el modelo del desafío y se exporta
export default mongoose.model('Challenge', challengeSchema)