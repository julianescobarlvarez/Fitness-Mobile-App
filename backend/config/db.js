import mongoose from 'mongoose'

// Función para conectar a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/miappdb')
        console.log('Conexión a MongoDB exitosa')
    } catch (error) {
        console.error('Error de conexión a MongoDB: ', error);
        process.exit(1)  // Termina el proceso en caso de error de conexión
    }
}

export default connectDB//module.exports = connectDB
