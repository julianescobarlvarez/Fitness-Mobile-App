import { StyleSheet, Text, View, TextInput, Pressable} from 'react-native'
import React, { useState } from 'react'

// Pantalla que requiere la edad del usuario
export default function AgeScreen(props) {
    const [age, setAge] = useState(0)

    // Navegar a la siguiente pantalla, pasando el valor capturado
    const handleNavigate = () => {
        console.log(age)
        props.navigation.navigate('fitnessGoals', { age: age })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Ingresa tu edad</Text>
            </View>
            <View style={styles.nameSection}>
                <TextInput style={styles.text} placeholder='Edad' value={age} onChangeText={setAge}></TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={age === 0} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, age === 0 && styles.disabledButton]}     
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
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 70
    },
    title: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 80
    },
    nameSection: {
        alignItems: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#black', 
        alignItems: 'center',
        paddingHorizontal: 20,
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