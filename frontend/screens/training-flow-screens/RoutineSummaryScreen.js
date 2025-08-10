import { StyleSheet, Text, View, FlatList, Pressable, Alert, Modal } from 'react-native'
//import React, { useState, useEffect, useRef } from 'react'
//import Ionicons from '@expo/vector-icons/Ionicons'

// Pantalla que muestra la información del plan seleccionado en el menu
export default function RoutineSummaryScreen(props) {    
    const { planData, dateEntry } = props.route.params
    const dateExit = new Date().getTime()
    const elapsedTime = dateExit - dateEntry

    // Convierte milisegundos a minutos y segundos
    const min = Math.floor(elapsedTime / 60000)
    const sec = Math.floor((elapsedTime % 60000) / 1000)

    const formattedTime = `${min}m ${sec}s`
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resumen de tu rutina</Text>
            <Text style={styles.resultText}>Tiempo invertido: {formattedTime} segundos</Text>
            <Text style={styles.resultText}>Ejercicios completados: {planData.trainingDays[0].exercises.length}</Text>
            {planData.trainingDays[0].rounds ? (
                <Text style={styles.resultText}>Rondas completadas: {planData.trainingDays[0].rounds}</Text>
            ):(null)}    

            <Pressable 
                style={styles.button} 
                onPress={() => props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'main' }],
                })}>
                <Text style={styles.buttonText}>Regresar a la pantalla principal</Text>
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
        marginBottom: 10,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4745ff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})