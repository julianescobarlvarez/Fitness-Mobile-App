import { StyleSheet, Text, View, TextInput, Pressable, Alert, PanResponder} from 'react-native'
import React, { useState } from 'react'

// Pantalla que requiere la altura y peso del usuario
export default function WeightScreen(props) {
    const { age, fitnessGoals, muscleGoals, height } = props.route.params
    const [weight, setWeight] = useState(0)
    
    // Navega a la siguiente pantalla, pasando los valores capturados
    const handleNavigate = () => {
        console.log(weight)
        props.navigation.navigate('physicalLevel', { age, fitnessGoals, muscleGoals, height, weight: weight})

    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Ingrese su peso</Text>
                <View style={styles.textContainer}>
                    <TextInput 
                        style={styles.text} 
                        placeholder='0' 
                        value={weight} 
                        onChangeText={setWeight} 
                        keyboardType='numeric'>
                    </TextInput>
                    <Text style={styles.kgText}>kg</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={weight === 0} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, weight === 0 && styles.disabledButton]}
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
    kgText: {
        fontSize: 20
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 70
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        textAlign: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 80
    },
    text: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#black', 
        alignItems: 'center',
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        borderRadius: 10,
        backgroundColor: '#f5f5f5', 
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