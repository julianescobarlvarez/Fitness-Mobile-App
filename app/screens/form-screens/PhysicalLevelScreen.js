import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'

//Pantalla que requiere el nivel físico del usuario
export default function PhysicalLevelScreen (props) {
    const { age, fitnessGoals, muscleGoals, height, weight } = props.route.params
    const [physicalLevel, setPhysicalLevel] = useState('')

    // Para escalar la imagen
    const [highlightedIndex, setHighlightedIndex] = useState(null)

    // Función para manejar el parpadeo de la imagen seleccionada
    const handlePressIn = (index) => {
        setHighlightedIndex(index)
    };

    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        console.log(physicalLevel)
        props.navigation.navigate('activityLevel', { 
            age,
            fitnessGoals, 
            muscleGoals, 
            height, 
            weight, 
            physicalLevel: physicalLevel
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Cuántas flexiones eres capaz de realizar?</Text>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 0 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}
                onStartShouldSetResponder={() => true}  // Permite que el View reciba el touch
                onResponderStart={() => handlePressIn(0)} // Activar la animación al tocar el contenedor 
                onResponderRelease={() => setPhysicalLevel('beginner')}   
            >
                <Text style={[styles.containerOptionTitle, highlightedIndex === 0 && { color: 'white'}]}>Principiante</Text>
                <Text style={[styles.containerOptionText, highlightedIndex === 0 && { color: 'white'}]}>1-5 flexiones</Text>
            </View>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 1 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}
                onStartShouldSetResponder={() => true}  // Permite que el View reciba el touch
                onResponderStart={() => handlePressIn(1)} // Activar la animación al tocar el contenedor  
                onResponderRelease={() => setPhysicalLevel('intermediate')}  
            >
                <Text style={[styles.containerOptionTitle, highlightedIndex === 1 && { color: 'white'}]}>Intermedio</Text>
                <Text style={[styles.containerOptionText, highlightedIndex === 1 && { color: 'white'}]}>6-11 flexiones</Text>
            </View>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 2 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}
                onStartShouldSetResponder={() => true}  // Permite que el View reciba el touch
                onResponderStart={() => handlePressIn(2)} // Activar la animación al tocar el contenedor  
                onResponderRelease={() => setPhysicalLevel('advanced')}  
            >
                <Text style={[styles.containerOptionTitle, highlightedIndex === 2 && { color: 'white'}]}>Avanzado</Text>
                <Text style={[styles.containerOptionText, highlightedIndex === 2 && { color: 'white'}]}>Más de 11 flexiones</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={physicalLevel === ''} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, physicalLevel === '' && styles.disabledButton]}
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 30
    },
    title: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
        margin: 10
    },
    containerOption: {
        borderRadius: 10,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: '#b6b6b6'
    },
    containerOptionTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    containerOptionText:{
        fontSize: 15,
        color: 'black',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    nextButton: {
        backgroundColor: '#4745ff',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0', 
    },
})