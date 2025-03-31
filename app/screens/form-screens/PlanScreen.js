import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
//import * as tf from '@tensorflow/tfjs'


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

    const [predictionResult, setPredictionResult] = useState(null)

    const handlePredict = async () => {
        const userData = {
            age: parseFloat(age),
            height: parseFloat(height),
            weight: parseFloat(weight),
            fitnessGoals: parseFloat(fitnessGoals),
            muscleGoals: parseFloat(muscleGoals),
            physicalLevel: parseFloat(physicalLevel),
            activityLevel: parseFloat(activityLevel),
            trainingCalendar: parseFloat(trainingCalendar),
        };
    
        try{
            const result = await predictRoutine(userData)
            setPredictionResult(result)
        } catch(error) {
            console.error('Error al obtener la predicción', error)
            Alert.alert('Error', 'No se pudo obtener la predicción')
        }
        const result = await predictRoutine(userData);
        Alert.alert("Resultado de la predicción", `Predicción: ${result}`);
    };
    
    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        props.navigation.navigate('planDetails',{
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
            <View
                style={{alignItems: 'center'}}
            >
                <Pressable 
                    onPress={handleNavigate} 
                    style={styles.nextButton} 
                >
                    <Text>Predecir rutina</Text>
                </Pressable>
            </View>
            {predictionResult !== null && (
                <View>
                    <Text>
                        Resultado de la IA: {predictionResult.toFixed(2)}
                    </Text>
                </View>
            )}
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    resultContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    resultText: {
        fontSize: 18,
        fontWeight: "bold",
    },

    nextButton: {
        backgroundColor: '#4745ff',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
});