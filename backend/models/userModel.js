import mongoose from 'mongoose'

// Se define el esquema del usuario
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
        trim: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true, 
    },
    avatar: { 
        type: String, 
        default: '', 
    },
    beginnerMedal: { 
        type: String, 
        default: 0, 
    },
    intermediateMedal: { 
        type: String, 
        default: 0, 
    },
    advanceMedal: { 
        type: String, 
        default: 0, 
    },
    plan: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Plan'
    }]
})

// Se crea el modelo del usuario y se exporta
export default mongoose.model('User', userSchema)
