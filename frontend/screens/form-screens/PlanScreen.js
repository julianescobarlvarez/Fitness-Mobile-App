import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import createPlanService from '../../services/createPlanService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from 'lottie-react-native'

// Pantalla que muestra los detalles del plan de entrenamiento personalizado
// Requiere solicitar las plantillas de planes de entrenamiento adaptados para funcionar
export default function PlanScreen (props) {
    const { 
        age,
        fitnessGoals, 
        muscleGoals, 
        height, 
        weight, 
        physicalLevel, 
        activityLevel, 
        trainingFrequency,
        planDuration 
    } = props.route.params

    const [thereResponse, setThereResponse] = useState(false)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        const planTemplate = async() => {
            try {
                const email = await AsyncStorage.getItem('emailToken')
                
                const planData = {
                    email: email,
                    age: age,
                    fitnessGoals: fitnessGoals, 
                    muscleGoals: muscleGoals, 
                    height: height, 
                    weight: weight, 
                    physicalLevel: physicalLevel, 
                    activityLevel: activityLevel, 
                    trainingFrequency: trainingFrequency,
                    planDuration: planDuration
                }

                const data = await createPlanService(planData)
                
                if(data){
                    setThereResponse(true)
                    setResponse(data.data)

                    // Se usa el servicio de AsyncStorage para guardar el token de plan actual
                    await AsyncStorage.setItem('planToken', data.data.response2._id)
                    console.log('Se ha llamado al servicio de AsyncStorage con éxito')
                    console.log('Response data: ', data.data)
                    }
                
            } catch {
                // Verifica el tipo de error para mostrar el mensaje correspondiente
                Alert.alert('No se pudo enviar la solicitud')
            }
        }

        planTemplate();
    }, []); // Solo se ejecuta una vez al montar


    // Navega a la siguiente pantalla, pasando los valores capturados
    const handleNavigate = () => {
        props.navigation.navigate('planDetails',{
            response: response
        })
    }

    return (
        <View style={styles.container}>   
            <Text style={styles.title}>
                Generando plan de entrenamiento optimizado
            </Text>
            <Text style={styles.subtitle}>
                Ajustando plan basado en tus objetivos y características...
            </Text>
            <LottieView
                source={require('../../assets/animations/loading plan.json')}
                autoPlay
                loop={thereResponse ? false : true}
                onAnimationFinish={handleNavigate}
                style={{ width: '100%', height: '50%'}}
            />
        </View>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 0,
        margin: 20
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        margin: 20,
        marginBottom: 30,
        textAlign: 'center'
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