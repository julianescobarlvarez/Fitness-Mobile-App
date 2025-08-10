import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'

const BASE_URL = "http://10.0.2.2:3000"

export default function ExercisePerformanceScreen(props) {
    const { planData, dateEntry } = props.route.params
    
    // Suponemos que los ejercicios están dentro de `trainingDays`, con un array de ejercicios por día
    const exercises = planData.trainingDays[0].exercises
    const roundsCount = planData.trainingDays[0].rounds || 2
    const restBetweenRounds = planData.trainingDays[0].restSets || 60
    const restBetweenExercises = planData.trainingDays[0].restExercise || 30

    // Estados para controlar el flujo del circuito
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [currentRound, setCurrentRound] = useState(0)
    const [resting, setResting] = useState(false)
    const [restTime, setRestTime] = useState(0) // Tiempo de descanso
    const [restType, setRestType] = useState('') // Para saber si estamos descansando entre ejercicios o rondas

    const currentExercise = exercises[currentExerciseIndex]

    // Función que maneja el siguiente paso en la ronda
    const handleNext = () => {
        if (resting) {
            // Si el usuario está en descanso, pasa al siguiente ejercicio o ronda
            setResting(false)

            if (currentExerciseIndex < exercises.length - 1) {
                // Si no ha completado todos los ejercicios, pasa al siguiente ejercicio
                setCurrentExerciseIndex(currentExerciseIndex + 1)
            } else {
                // Si hemos terminado todos los ejercicios, descansamos entre rondas
                if (currentRound < roundsCount - 1) {
                    setCurrentRound(currentRound + 1)
                    setCurrentExerciseIndex(0)
                } else {
                    // Si hemos completado todas las rondas, vamos a la pantalla de resumen
                    props.navigation.navigate('routineSummary', { planData, dateEntry })
                }
            }
        } else {
            // Si no estamos en descanso, significa que estamos en ejercicio
            setResting(true);
            setRestTime(currentExerciseIndex < exercises.length - 1 ? restBetweenExercises : restBetweenRounds)
            setRestType(currentExerciseIndex < exercises.length - 1 ? 'exercise' : 'round')
        }
    }

    // Cronómetro de descanso
    useEffect(() => {
        let interval;
        
        if (resting && restTime > 0) {
            interval = setInterval(() => {
                setRestTime(prevTime => prevTime - 1)
            }, 1000)
        } else if (restTime === 0) {
            setResting(false) // Termina el descanso
        }

        // Limpiamos el intervalo al salir del descanso
        return () => clearInterval(interval)
    }, [resting, restTime])

    // Formato para mostrar el tiempo en segundos (puedes ajustarlo si prefieres minutos)
    const formatTime = (seconds) => {
        return `${seconds} s`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentExercise.name}</Text>
            <Text style={styles.title2}>Ronda: {currentRound + 1} de {roundsCount}</Text>
            {resting ? (
                <Text style={styles.restText}>
                    {restType === 'exercise' 
                        ? `Descanso entre ejercicios: ${formatTime(restTime)}`
                        : `Descanso entre rondas: ${formatTime(restTime)}`}
                </Text>
            ) : (
                <Text style={styles.title2}>¡Haz el ejercicio!</Text>
            )}
            <Image
                source={{ uri: `${BASE_URL}${currentExercise.exerciseImage}` }}
                style={styles.image}
                resizeMode="contain"
            />
            <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                {resting
                    ? (restType === 'exercise' 
                        ? 'Descanso entre ejercicios' 
                        : 'Descanso entre rondas')
                    : (currentExerciseIndex < exercises.length - 1 
                        ? 'Siguiente ejercicio' 
                        : 'Comenzar siguiente ronda')}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    restText: {
        fontSize: 18,
        color: 'gray',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4745ff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 160,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})










