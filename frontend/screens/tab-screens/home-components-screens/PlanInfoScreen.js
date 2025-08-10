import { StyleSheet, Text, View, FlatList, Pressable, Alert, Modal } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

// Pantalla que muestra la información del plan seleccionado en el menu
export default function PlanInfoScreen(props) {    
    const { plan } = props.route.params
    let muscleGroupPlan = []
    //const handle = async () => {}
    console.log('Información del plan: ',plan)
    const RenderPlanDetail = ({ plan }) => {
        if (plan.muscleGoals.includes('arms')){
            muscleGroupPlan.push('Brazos')
        }
        if (plan.muscleGoals.includes('chest')){
            muscleGroupPlan.push('Pecho')
        }
        if (plan.muscleGoals.includes('abs')){
            muscleGroupPlan.push('Abdominales')
        }
        if (plan.muscleGoals.includes('legs')){
            muscleGroupPlan.push('Piernas')
        }

        return (
            <View style={styles.container2}>
                <Text style={styles.subtitle}>
                    Músculos entrenados:{' '}
                    <Text style={styles.text}>{muscleGroupPlan.join(', ')}</Text>
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>  
            <View style={styles.container3}>
                <Text style={styles.title}>Plan de entrenamiento</Text>{/*Nombre del plan*/}
                <View style={styles.container2}>
                    <Text style={styles.subtitle}>{/*Objetivo fitness*/}
                        Nombre del plan:{' '}
                        <Text style={styles.text}>{plan.name}</Text>
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.subtitle}>{/*Objetivo fitness*/}
                        Objetivo:{' '}
                        <Text style={styles.text}>{plan.fitnessGoals}</Text>
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.subtitle}>{/*Nivel del usuario*/}
                        Dificultad:{' '}
                        <Text style={styles.text}>{plan.level}</Text>
                    </Text>
                </View>
                {plan.fitnessGoals == 'Bajar de peso' ? (
                    <View style={styles.container2}>
                        <Text style={styles.subtitle}>
                                Tipo de intensidad:{' '}
                                {Array.isArray(plan.planIntensity) && 
                                plan.planIntensity.includes('MICT') ? (
                                    <Text style={styles.text}>
                                    {plan.planIntensity.join(', ')}
                                    </Text>
                                ) : (
                                    <Text style={styles.text}>
                                    {plan.planIntensity}
                                    </Text>
                                )}
                        </Text>
                    </View>
                ):(<RenderPlanDetail plan={plan}/>)}

                <View style={styles.container2}>
                    <Text style={styles.subtitle}>{/*Duración del plan*/}
                        Duración:{' '}
                        <Text style={styles.text}>{plan.planDuration} semanas</Text>
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.subtitle}>{/*Duración del plan*/}
                        Desde:{' '}
                        <Text style={styles.text}>{plan.startDate}{'  '}hasta{'  '}</Text>
                        <Text style={styles.text}>{plan.endDate}</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    container3: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        //marginHorizontal: 20,
        //marginVertical: 2
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal',
        //margin: 20,
        //marginBottom: 30
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 60
    },
    button: {
        backgroundColor: '#4745ff',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
})