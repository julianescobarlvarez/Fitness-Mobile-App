import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

//Pantalla que muestra el plan de entrenamiento personalizado listo para que el usuario pueda 
//utilizarla
export default function PlanDetailsScreen (props) {
    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'main' }],
        });
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Pressable 
                    onPress={handleNavigate}
                    style={styles.nextButton}
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
})