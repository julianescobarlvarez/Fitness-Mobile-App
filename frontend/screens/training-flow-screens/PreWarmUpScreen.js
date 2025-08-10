import { StyleSheet, Text, View, FlatList, Pressable, Alert, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import Timer from '../../services/chronometerService'

// Pantalla que muestra la información del plan seleccionado en el menu
export default function PreWarmUpScreen(props) {    
    const { planData } = props.route.params
    //console.log('Estructura de data en ella: ', planData)
    const [timeUp, setTimeUp] = useState(420)
    const dateEntry = new Date().getTime()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Comienza tu calentamiento!</Text>
            {planData.fitnessGoals == 'Bajar de peso' ? (
                <Text style={styles.subtitle}>
                    Realiza un calentamiento básico antes de comenzar tu rutina.
                    Muévete trotando, haciendo burpees o jumping jacks de baja intensidad.
                </Text>
            ):(
                <Text style={styles.subtitle}>
                    Realiza un calentamiento básico antes de comenzar tu rutina.
                    Muévete y simula los ejercicios con un peso más ligero para activar 
                    los músculos que vas a trabajar con más peso
                </Text>
            )}
            {planData.fitnessGoals == 'Bajar de peso' ? (
                <LottieView
                    source={require('../../assets/animations/warm up1.json')}
                    autoPlay
                    speed={0.6}
                    //onAnimationFinish={handleNavigate}
                    style={styles.gif}
                />
            ):(
                <LottieView
                    source={require('../../assets/animations/warm up2.json')}
                    autoPlay
                    speed={0.6}
                    //onAnimationFinish={handleNavigate}
                    style={styles.gif2}
                />
            )}
            <Timer initialTime={timeUp}/>{/*onTimeEnd={handleTimeEnd}*/}
            <View style={{marginBottom: 70}}/>
            <Pressable 
                style={styles.button}
                onPress={() => {
                    // Aquí pasamos el contenido del plan a la pantalla de ejercicios
                    setTimeUp(0)
                    if(planData.fitnessGoals == 'Bajar de peso'){
                        props.navigation.navigate('exercisePerformance', { planData, dateEntry: dateEntry })
                    }
                    else {
                        props.navigation.navigate('exercisePerformance2', { planData, dateEntry: dateEntry })
                    }
                }}
            >
                <Text style={styles.buttonText}>Seguir a los ejercicios</Text>
            </Pressable>
            <View style={{marginBottom: 50}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 30
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4745ff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: -30
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    gif: {
        width: 340,
        height: 300,
        flexDirection: 'column',
        marginVertical: 40,
    },
    gif2: {
        width: 340,
        height: 280,
        flexDirection: 'column',
        marginVertical: 40,
    }
})