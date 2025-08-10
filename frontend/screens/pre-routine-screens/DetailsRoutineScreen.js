import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native'

const dayMap = {
    Sunday: 'Domingo',
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
    Saturday: 'Sábado',
}

const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

//const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/assets"
const BASE_URL = "http://10.0.2.2:3000"

// Función para obtener el próximo día de entrenamiento (incluye hoy si aplica)
function getNextTrainingDay(trainingDays, todayIndex) {
    // Convertimos días de entrenamiento a índices
    const trainingDayIndexes = trainingDays
        .map(td => ({ index: daysOfWeek.indexOf(td.day), dayData: td }))
        .filter(({ index }) => index !== -1)
        .sort((a, b) => a.index - b.index)

    // Buscamos día igual o posterior a hoy
    for (let i = 0; i < trainingDayIndexes.length; i++) {
        if (trainingDayIndexes[i].index >= todayIndex) {
            return trainingDayIndexes[i].dayData
        }
    }
    // Si no encontramos ninguno después, devolvemos el primero (rotación semanal)
    return trainingDayIndexes[0]?.dayData
}

// Pantalla que muestra la información de la rutina
export default function DetailsRoutineScreen(props) {
    const { planData } = props.route.params

    // Día actual
    const today = new Date()
    const todayIndex = today.getDay()
    //const todayIndex = 'Martes'

    // Obtener próximo día de entrenamiento según lógica de rotación semanal
    const nextTrainingDay = getNextTrainingDay(planData.trainingDays, todayIndex)

    //const dayName = dayMap[today.toLocaleDateString('en-US', { weekday: 'long' })] | original
    //const dayName = 'Martes' //para el cambio horario | parcial

    // Buscar día correspondiente
    //const todayTraining = planData.trainingDays.find(day => day.day === dayName) | original

    if (!nextTrainingDay) {//!todayTraining | original
        return (
        <View style={styles.centered}>
            <Text style={styles.title}>Hoy no tienes entrenamiento</Text>
        </View>
        )
    }

    const handleGlobal = () => {
        props.navigation.navigate('trainingFlow', { screen: 'preWarnUp', params: {planData: planData} })
    }

    return (
        <>
            <FlatList
                data={nextTrainingDay.exercises}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                Ejercicios para el día
                                {nextTrainingDay.day === daysOfWeek[todayIndex] ? ' de hoy' : ' '+nextTrainingDay.day}
                            </Text>
                            <Text style={styles.subtitle}>
                                Observa la información de tus rutinas y ajústalas a tus preferencias
                            </Text>
                            {planData.fitnessGoals != 'Ganancia muscular' ?(
                                <View style={styles.divider}></View>
                            ):(<View style={{marginVertical: 10}}></View>)}
                            <Pressable 
                                //onPress={() => props.navigation.navigate('exerciseDetails', { exercise: {
                                //    rounds: nextTrainingDay.rounds,
                                //    restExercise: nextTrainingDay.restExercise,
                                //    restSets: nextTrainingDay.restSets
                                //}})} 

                                style={({ pressed }) => [
                                pressed && styles.listPressed
                                ]} 
                                onPress={() => {
                                    setTimeout(() => {
                                        props.navigation.navigate('exerciseDetails', { planId: planData._id, day: nextTrainingDay.day, exercise: {
                                            rounds: nextTrainingDay.rounds,
                                            restExercise: nextTrainingDay.restExercise,
                                            restSets: nextTrainingDay.restSets
                                        }})
                                    }, 100) 
                                }}

                            >
                                {planData.fitnessGoals != 'Ganancia muscular' ? (
                                    <>
                                        <View style={{paddingVertical: 3}}></View>
                                        {planData.fitnessGoals == 'Bajar de peso'?(
                                            <Text style={styles.rest}>Rondas: {nextTrainingDay.rounds}</Text>
                                        ):(null)}
                                        <Text style={styles.rest}>Descanso entre ejercicios: {nextTrainingDay.restExercise}s</Text>
                                        {planData.fitnessGoals == 'Bajar de peso'?(
                                            <Text style={styles.rest}>Descanso entre rondas: {nextTrainingDay.restSets}s</Text>
                                        ):(
                                            <Text style={styles.rest}>Descanso entre series: {nextTrainingDay.restSets}s</Text>
                                        )}
                                        <View style={{paddingVertical: 10}}></View>
                                    </>
                                ):(null)}
                            </Pressable>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Pressable
                            style={({ pressed }) => [
                                pressed && styles.cardPressed
                            ]} 
                            onPress={() => {
                                setTimeout(() => {
                                    props.navigation.navigate('exerciseDetails', { planId: planData._id, day: nextTrainingDay.day, exercise: item })
                                }, 100) 
                            }}
                        >
                            <View style={styles.exerciseCard}>
                                <Image
                                    source={{ uri: `${BASE_URL}${item.exerciseImage}` }}
                                    style={styles.image}
                                    resizeMode="contain"
                                />
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    {item.sets && <Text style={styles.text}>Sets: {item.sets}</Text>}
                                    {item.reps && <Text style={styles.text}>Reps: {item.reps}</Text>}
                                    {item.weight && <Text style={styles.text}>Peso: {item.weight} kg</Text>}
                                    {item.duration && <Text style={styles.text}>Duración: {item.duration} segundos</Text>}
                                </View>
                            </View>
                        </Pressable>
                    </View>
                )}
            />
            <View style={{marginVertical: 5}}></View>
            <View style={styles.button2Container}>
                <Pressable 
                    style={styles.button2} 
                    onPress={() => handleGlobal()}
                >
                    <Text style={styles.textButton2}>Realizar rutina</Text>
                </Pressable>
            </View>
            <View style={{marginVertical: 5}}></View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15,
    },
    header: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 15,
        //padding: 15
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15
    },
    subtitle: {
        fontSize: 16,
        marginVertical: 5,
        paddingHorizontal: 15
    },
    rest: {
        fontSize: 15,
        color: '#666',
        marginTop: 4,
        paddingHorizontal: 15
    },
    exerciseCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 2,
        borderColor: '#f5f5f5',
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        backgroundColor: '#f5f5f5'
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
        marginHorizontal: 15,
        marginBottom: 2
    },
    cardPressed: {
        backgroundColor: 'black',
        borderRadius: 10,
        elevation: 3,
        transform: [{ scale: 0.98 }],
        opacity: 0.98
    },
    listPressed: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        transform: [{ scale: 0.98 }],
        opacity: 0.92
    },
    button2Container: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    button2: {
        backgroundColor: '#4745ff',
        padding: 15,
        //marginTop: 20,
        borderRadius: 5,
        width: '55%',
        alignItems: 'center',
    },
    textButton2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
})