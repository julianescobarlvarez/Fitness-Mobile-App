import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

//Pantalla que requiere la altura del usuario
export default function HeightScreen(props) {
    const { age, fitnessGoals, muscleGoals } = props.route.params
    const [height, setHeight] = useState(0)
    
    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        console.log(height)
        props.navigation.navigate('weight', { age, fitnessGoals, muscleGoals, height: height})
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Ingrese su altura</Text>
                <View style={styles.textContainer}>
                    <TextInput 
                        style={styles.text} 
                        placeholder='0' 
                        value={height} 
                        onChangeText={setHeight} 
                        keyboardType='numeric'
                    >
                    </TextInput>
                    <Text style={styles.cmText}>cm</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={height === 0} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, height === 0 && styles.disabledButton]}
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
    cmText: {
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
        justifyContent: 'center'
    },
    title: {
        fontSize:25,
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