import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

//Pantalla que muestra los detalles del plan de entrenamiento personalizado
export default function PlanScreen (props) {
    const { 
        age,
        fitnessGoals, 
        muscleGoals, 
        height, 
        weight, 
        physicalLevel, 
        activityLevel, 
        trainingCalendar 
    } = props.route.params
    
    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        props.navigation.navigate('planDetails', { 
            age,
            fitnessGoals, 
            muscleGoals, 
            height, 
            weight, 
            physicalLevel, 
            activityLevel, 
            trainingCalendar
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable 
                    onPress={handleNavigate}
                    disabled={trainingCalendar.length === 0}
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