import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'

const BASE_URL = "http://10.0.2.2:3000"

export default function ExercisePerformanceScreen(props) {
    const { planData, dateEntry } = props.route.params
    const exercises = planData.trainingDays[0].exercises
    
    // Estado que controla el índice del ejercicio actual y la serie dentro de cada ejercicio
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
    const [currentSet, setCurrentSet] = useState(0)
    const [resting, setResting] = useState(false)
    const [restTime, setRestTime] = useState(0) // Agregamos el tiempo de descanso

    const currentExercise = exercises[currentExerciseIndex]
    const seriesCount = currentExercise.series || 3

    // Función para manejar el siguiente paso: serie o ejercicio
    const handleNext = () => {
        if (resting) {
            // Si el usuario está en descanso, solo pasa al siguiente ejercicio/serie
            setResting(false)
            if (currentSet < seriesCount - 1) {
                // Si no ha terminado todas las series, pasa a la siguiente serie
                setCurrentSet(currentSet + 1)
            } else {
                // Si ha terminado todas las series, descansa entre ejercicios
                if (currentExerciseIndex < exercises.length - 1) {
                    // Si no ha terminado todos los ejercicios, descansas entre ellos
                    setCurrentExerciseIndex(currentExerciseIndex + 1)
                    setCurrentSet(0)
                } else {
                    // Si terminamos todos los ejercicios, vamos a la pantalla de resumen
                    props.navigation.navigate('routineSummary', { planData, dateEntry })
                }
            }
        } else {
            // Si no esta en descanso, termina la serie actual y pasamos al descanso
            setResting(true)
            setRestTime(currentExercise.rest)
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
            setResting(false)
        }

        // Limpiamos el intervalo al salir del descanso
        return () => clearInterval(interval)
    }, [resting, restTime])

    // Formato para mostrar el tiempo en segundos (puedes ajustarlo si prefieres minutos)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentExercise.name}</Text>
            <Text style={styles.title2}>Serie: {currentSet + 1} de {seriesCount}</Text>
            <Text style={styles.title2}>Repeticiones: {currentExercise.reps}</Text>
            {resting ? (
                <Text style={styles.restText}>Descanso: {currentExercise.rest}</Text>
            ) : (
                <Text style={styles.title3}>¡Haz las repeticiones!</Text>
            )}
            <Image
                source={{ uri: `${BASE_URL}${currentExercise.exerciseImage}` }}
                style={styles.image}
                resizeMode="contain"
            />
            {resting ? (
                <Text style={styles.timerText}>{formatTime(restTime)}</Text>
            ) : (
                null
            )}
            <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                {resting
                    ? (currentSet < seriesCount - 1 ? 'Descanso entre series' : 'Descanso entre ejercicios')
                    : (currentSet < seriesCount - 1 ? 'Siguiente serie' : 'Finalizar ejercicio')}
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
        marginBottom: 20,
        textAlign: 'center',
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    title3: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginVertical: 15,
    },
    restText: {
        fontSize: 18,
        color: 'gray',
        marginVertical: 15,
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
        marginTop: 100,
        marginBottom: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    timerText: {
        fontSize: 50,
        fontWeight: 'bold',
        marginTop: -50,
        marginBottom: -10
    }
})


