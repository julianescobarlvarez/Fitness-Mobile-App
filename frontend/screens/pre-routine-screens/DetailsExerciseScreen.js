import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, ScrollView, Pressable, KeyboardAvoidingView, Alert } from 'react-native'
import patchPlanService from '../../services/patchPlanService'

const BASE_URL = 'http://10.0.2.2:3000'

export default function DetailsExerciseScreen(props) {
    const { planId, day, exercise } = props.route.params
    const [sets, setSets] = useState(exercise.sets?.toString() || null)
    const [reps, setReps] = useState(exercise.reps?.toString() || null)
    const [duration, setDuration] = useState(exercise.duration?.toString() || null)
    const [weight, setWeight] = useState(exercise.weight?.toString() || null)
    const [rounds, setRounds] = useState(exercise.rounds?.toString() || null)
    const [restExercise, setRestExercise] = useState(exercise.restExercise?.toString() || null)
    const [restSets, setRestSets] = useState(exercise.restSets?.toString() || null)

    const handleApplyChanges = async () => {   
        const updatedData = {}

        const maybeAssignNumber = (field, value) => {
            if (value !== null && value.trim() !== '' && !isNaN(value)) {
                updatedData[field] = Number(value);
            }
        }

        maybeAssignNumber('sets', sets)
        maybeAssignNumber('reps', reps)
        maybeAssignNumber('duration', duration)
        maybeAssignNumber('weight', weight)
        maybeAssignNumber('rounds', rounds)
        maybeAssignNumber('restExercise', restExercise)
        maybeAssignNumber('restSets', restSets)

        try {
            if(restExercise === null){
                await patchPlanService(planId, day, exercise.name, updatedData)
                console.log('Cambios aplicados correctamente')
            }
            else{
                await patchPlanService(planId, day, null, updatedData)
                console.log('Cambios aplicados correctamente')
            }

            props.navigation.reset({
                index: 0,
                routes: [{ name: 'main' }],
            })

            Alert.alert('Se ha modificado con éxito')

        } catch (error) {
            console.error('Error al aplicar cambios:', error)
            alert('Error al aplicar cambios')
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'height'}
            keyboardVerticalOffset={5} // Ajusta si tienes header
        > 
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{exercise.name}</Text>
                {restExercise == null ?(
                    <Image
                        source={{ uri: encodeURI(`${BASE_URL}${exercise.exerciseImage}`) }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ):(null)}
                <View style={styles.container2}>
                    {sets !== null && (
                        <>
                            <Text style={styles.label}>Sets</Text>
                            <TextInput
                                style={styles.input}
                                value={sets}
                                onChangeText={setSets}
                                keyboardType="numeric"
                            />
                        </>
                    )}

                    {reps !== null && (
                        <>
                            <Text style={styles.label}>Reps</Text>
                            <TextInput
                                style={styles.input}
                                value={reps}
                                onChangeText={setReps}
                                keyboardType="numeric"
                            />
                        </>
                    )}

                    {duration !== null && (
                        <>
                            <Text style={styles.label}>Duración (s)</Text>
                            <TextInput
                                style={styles.input}
                                value={duration}
                                onChangeText={setDuration}
                                keyboardType="numeric"
                            />
                        </>
                    )}

                    {weight !== null && (
                        <>
                            <Text style={styles.label}>Peso (kg)</Text>
                            <TextInput
                                style={styles.input}
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType="numeric"
                            />
                        </>
                    )}

                    {rounds !== null && (
                        <>
                            <Text style={styles.label}>Rondas</Text>
                            <TextInput
                                style={styles.input}
                                value={rounds}
                                onChangeText={setRounds}
                                keyboardType="numeric"
                            />
                        </>
                    )}

                    {restExercise !== null && (
                        <>
                            <Text style={styles.label}>Descanso entre ejercicios</Text>
                            <TextInput
                                style={styles.input}
                                value={restExercise}
                                onChangeText={setRestExercise}
                                keyboardType="numeric"
                            />
                        </>
                    )}

                    {restSets !== null && (
                        <>
                            {rounds !== null ? (
                                <Text style={styles.label}>Descanso entre rondas</Text>
                            ) : (
                                <Text style={styles.label}>Descanso entre series</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                value={restSets}
                                onChangeText={setRestSets}
                                keyboardType="numeric"
                            />
                        </>
                    )}
                    <View style={{paddingVertical: 8}}></View>
                </View>
                <View style={styles.button2Container}>
                    <Pressable 
                        style={styles.button2} 
                        onPress={()=> handleApplyChanges()}
                    >
                        <Text style={styles.textButton2}>Aplicar cambios</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
        flexGrow: 1
    },
    container2: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 4,
        borderRadius: 6,
    },
    button2Container: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 30,
    },
    button2: {
        backgroundColor: '#4745ff',
        padding: 15,
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
