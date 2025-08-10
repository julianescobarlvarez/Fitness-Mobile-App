import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import { Checkbox } from 'react-native-paper'
import Slider from '@react-native-community/slider'

// Pantalla que muestra la frecuencia de entrenamiento por grupo muscular o en su totalidad
// en la semana. Además, el plan tendrá una duración definida por el usuario.
// Las posibilidades son de 2 semanas mínimo hasta 16 semanas como máximo.
export default function TrainingFrequencyScreen(props) {
    const { 
        age,
        fitnessGoals, 
        muscleGoals, 
        height, 
        weight, 
        physicalLevel, 
        activityLevel 
    } = props.route.params
    
    const [trainingFrequency, setTrainingFrequency] = useState(0)
    const [planDuration, setPlanDuration] = useState(2)

    const sliderValue = useRef(0); // Manejo temporal del valor del slider
    const [displayValue, setDisplayValue] = useState(planDuration) // Valor mostrado dinámicamente

    const [button1Pressed, setButton1Pressed] = useState(false)
    const [button2Pressed, setButton2Pressed] = useState(false)
    const [button3Pressed, setButton3Pressed] = useState(false)

    // Función para manejar el toque de un botón
    const handlePress = (number) => {
        setTrainingFrequency(number)
        if (number === 1) {
            setButton1Pressed(true)
            setButton2Pressed(false)
            setButton3Pressed(false)
        
        } else if (number === 2) {
            setButton1Pressed(false)
            setButton2Pressed(true)
            setButton3Pressed(false)
        
        } else if (number === 3) {
            setButton1Pressed(false)
            setButton2Pressed(false)
            setButton3Pressed(true)
        }
    };

    // Función para manejar el valor semanal mostrado de forma dinámica en pantalla
    const handleValueChange = (newValue) => {
        sliderValue.current = newValue // Actualiza temporalmente el valor
        setDisplayValue(newValue) // Actualiza el valor mostrado dinámicamente
    };

    // Función para actualizar el estado del valor
    const handleSlidingComplete = () => {
        // Actualiza el estado final al soltar el slider
        setPlanDuration(sliderValue.current)
    };

    // Navega a la siguiente pantalla, pasando los valores capturados
    const handleNavigate = () => {
        console.log('Frecuencia semanal:', trainingFrequency)
        console.log('Duración semanal:', planDuration)
        console.log('')
        props.navigation.navigate('plan', { 
            age,
            fitnessGoals, 
            muscleGoals,  
            height, 
            weight, 
            physicalLevel, 
            activityLevel, 
            trainingFrequency: trainingFrequency,
            planDuration: planDuration
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Elije la frecuencia semanal de entrenamiento
            </Text>
            {/*Texto para Hipertrofia y Calistenia*/}
            <Text style={styles.subtitle}>
                ¿Cuántos días a la semana quieres entrenar?
            </Text>
            <View style={styles.row}>
                <Pressable 
                    style={[styles.button, button1Pressed && styles.buttonPressed]} 
                    onPress={() => handlePress(1)}
                    onPressIn={() => setButton1Pressed(true)}  // Botón presionado
                    //onPressOut={() => setButton1Pressed(false)} // Botón suelto  
                >
                    <Text style={[styles.buttonText, button1Pressed && styles.buttonPressedText]}>1</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, button2Pressed && styles.buttonPressed]}
                    onPress={() => handlePress(2)}
                    onPressIn={() => setButton2Pressed(true)}  // Botón presionado
                    //onPressOut={() => setButton2Pressed(false)} // Botón suelto  
                >
                    <Text style={[styles.buttonText, button2Pressed && styles.buttonPressedText]}>2</Text>
                </Pressable>
                <Pressable 
                    style={[styles.button, button3Pressed && styles.buttonPressed]}
                    onPress={() => handlePress(3)}
                    onPressIn={() => setButton3Pressed(true)}  // Botón presionado
                    //onPressOut={() => setButton2Pressed(false)} // Botón suelto  
                >
                    <Text style={[styles.buttonText, button3Pressed && styles.buttonPressedText]}>3</Text>
                </Pressable>
            </View>
            <View>
                <Text style={styles.subtitle}>
                    La rutina se distribuirá optimizadamente en la semana
                </Text>
                <Text style={styles.subtitle2}>Seleccione la duración semanal del plan de entrenamiento</Text>
                <Text style={styles.text}>Semanas: {displayValue}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue= {2}
                    maximumValue={16}
                    step={1}
                    value={planDuration}
                    onValueChange={handleValueChange}
                    onSlidingComplete={handleSlidingComplete}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={trainingFrequency == 0}
                    style={[styles.nextButton, trainingFrequency == 0 && styles.disabledButton]} 
                    onPress={handleNavigate}
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container2: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 30
    },
    daysContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 15,
        backgroundColor: 'green',
        borderRadius: 5,
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
    subtitle2: {
        fontSize: 16,
        color: 'black',
        margin: 20,
        marginTop: 60,
        marginBottom: 30,
        textAlign: 'center'
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    text: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#black', 
        alignItems: 'center',
        marginHorizontal: 15,
        //paddingHorizontal: 10, 
        backgroundColor: '#f5f5f5', 
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        margin: 10,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: 55,
        margin: 10,
    },
    dayContainer: {
        alignItems: 'center',
        borderColor: '#b6b6b6',
        borderWidth: 1,
        borderRadius: 10,
        width: 80,  
        height: 70,  
    },
    slider: {
        marginHorizontal: 20,
        height: 40,
    },
    button: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
    buttonPressed: {
        backgroundColor: '#4745ff',
        borderColor: '#4745ff',
        borderWidth: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        marginHorizontal: 15,
        fontWeight: 'bold', 
    },
    buttonPressedText: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 15,
        fontWeight: 'bold', 
    },
})