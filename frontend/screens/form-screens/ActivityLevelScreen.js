import { StyleSheet, Text, View, TextInput, Pressable, Alert, Animated } from 'react-native'
import React, { useState} from 'react'

// Pantalla que requiere el nivel de actividad rutinaria del usuario
export default function ActivityLevelScreen(props) {
    const { 
        age,
        fitnessGoals, 
        muscleGoals, 
        height, 
        weight, 
        physicalLevel 
    } = props.route.params

    const [activityLevel, setActivityLevel] = useState('')

    // Para escalar la imagen
    const [highlightedIndex, setHighlightedIndex] = useState(null)

    // Función para manejar el parpadeo de la imagen seleccionada
    const handlePressIn = (index) => {
        setHighlightedIndex(index)
    };
    
    // Para navegar a la siguiente pantalla, pasando los valores capturados
    const handleNavigate = () => {
        console.log(activityLevel)
        props.navigation.navigate('trainingFrequency', { 
            age,
            fitnessGoals, 
            muscleGoals, 
            height, 
            weight, 
            physicalLevel, 
            activityLevel: activityLevel
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Cuál es tu nivel de actividad en general?</Text>
            <View
                style={[
                    styles.containerOption, 
                    highlightedIndex === 0 && { 
                        borderColor: '#4745ff', 
                        borderRadius: 10, 
                        backgroundColor: '#4745ff' 
                    }
                ]}
                onStartShouldSetResponder={() => true}  // Permite que el View reciba el touch
                onResponderStart={() => handlePressIn(0)} // Se activa la animación al tocar el contenedor
                onResponderRelease={() => setActivityLevel('sedentary')} 
            >
                <Text style={[styles.containerOptionTitle, highlightedIndex === 0 && { color: 'white'}]}>Sedentario</Text>
            </View>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 1 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}   
                onStartShouldSetResponder={() => true}  // Permite que el View reciba el touch
                onResponderStart={() => handlePressIn(1)} // Se activa la animación al tocar el contenedor 
                onResponderRelease={() => setActivityLevel('active')}  
            >
                <Text style={[styles.containerOptionTitle, highlightedIndex === 1 && { color: 'white'}]}>Activo</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={activityLevel === ''} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, activityLevel === '' && styles.disabledButton]}
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
        margin: 20
    },
    containerOption: {
        borderRadius: 10,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        borderWidth: 1,
        padding: 25,
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