import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Timer = ({ initialTime = 300, onTimeEnd }) => {
    // Inicializamos el tiempo (en segundos), por defecto será 5 minutos (300 segundos)
    const [seconds, setSeconds] = useState(initialTime)
    const [isRunning, setIsRunning] = useState(true)
    const [intervalId, setIntervalId] = useState(null)

    // Ref para el intervalo
    const intervalRef = useRef(null)

    // Función que maneja el conteo hacia abajo
    const startTimer = () => {
        if (seconds <= 0) return

        setIsRunning(true)
        const id = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds <= 0) {
                clearInterval(id)
                if (onTimeEnd) onTimeEnd()
                return 0
                }
                return prevSeconds - 1
            })
        }, 1000)
        setIntervalId(id)
    }

    // Función para reiniciar el temporizador
    const resetTimer = () => {
        setIsRunning(false)
        clearInterval(intervalId)
        setSeconds(initialTime)
    }

    useEffect(() => {
        // Inicia el temporizador de inmediato
        if (isRunning) {
            startTimer()
        }
        
        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId)
    }, [isRunning])

    // Convertir los segundos en minutos y segundos (opcional)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }

    return (
        <View style={styles.container}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <View style={styles.buttonContainer}>
                {/*<Button title="Reiniciar" onPress={resetTimer} />*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    },
})

export default Timer
