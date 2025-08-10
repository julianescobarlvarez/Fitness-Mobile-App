import { StyleSheet, Text, View, Pressable, Alert, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'

// Pantalla que muestra los detalles del plan de entrenamiento personalizado
// Requiere solicitar las plantillas de planes de entrenamiento adaptados para funcionar
export default function PlanDetailsScreen (props) {
    const { response } = props.route.params

    // Navega a la siguiente pantalla, pasando los valores capturados
    const handleNavigate = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'main' }],
        })
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>   
            <View>
                <Text style={styles.title}>
                    ¡Tu plan de entrenamiento ya está disponible!
                    {/*Posteriormente completo las demás plantillas*/}
                    {/*El inicio cambia por la presencia de al menos un plan de entrenamiento*/}
                    {/*La pantalla de progreso también cambia por el plan de entrenamiento activo*/}
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/portapapeles.png')}
                    style={styles.image}
                    resizeMode='contain'  
                ></Image>
            </View>
            <View style={styles.userContainer}>
                <Text style={styles.title2}>Plan de entrenamiento</Text>{/*Nombre del plan*/}
                <View style={styles.container2}>
                    <Ionicons name="checkbox-outline" size={30}></Ionicons>
                    <Text style={styles.subtitle}>{/*Objetivo fitness*/}
                        {'  '}Objetivo:{' '}
                        <Text style={styles.text}>{response.response2.fitnessGoals}</Text>
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Ionicons name="checkbox-outline" size={30}></Ionicons>
                    <Text style={styles.subtitle}>{/*Nivel del usuario*/}
                        {'  '}Dificultad:{' '}
                        <Text style={styles.text}>{response.response2.level}</Text>
                    </Text>
                </View>
                {response.response2.fitnessGoals == 'Bajar de peso' ? (
                    <View style={styles.container2}>
                        <Ionicons name="checkbox-outline" size={30}></Ionicons>
                        <Text style={styles.subtitle}>
                                {'  '}Tipo de intensidad:{' '}
                                {Array.isArray(response.response2.planIntensity) && 
                                response.response2.planIntensity.includes('MICT') ? (
                                    <Text style={styles.text}>
                                    {response.response2.planIntensity.join(', ')}
                                    </Text>
                                ) : (
                                    <Text style={styles.text}>
                                    {response.response2.planIntensity}
                                    </Text>
                                )}
                        </Text>
                    </View>
                ):(null)}

                <View style={styles.container2}>
                    <Ionicons name="calendar-outline" size={30}></Ionicons>
                    <Text style={styles.subtitle}>{/*Duración del plan*/}
                        {'  '}Duración:{' '}
                        <Text style={styles.text}>{response.response2.planDuration} semanas</Text>
                    </Text>
                </View>
                <View style={styles.container2}>
                    <Ionicons name="calendar-outline" size={30}></Ionicons>
                    <Text style={styles.subtitle}>{/*Días de entrenamiento*/}
                        {'  '}Entreno:{' '}
                        <Text style={styles.text}>{response.result.join(', ')}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.userContainer}>
                <Text style={styles.title2}>Sugerencias del plan</Text>{/*Nombre del plan*/}
                <View style={styles.container2}>
                    <Ionicons name="bulb-outline" size={30}></Ionicons>
                    <Text style={styles.text}>{'  '}Tu plan comienza desde hoy</Text>
                </View>
                <View style={styles.container2}>
                    <Ionicons name="bulb-outline" size={30}></Ionicons>
                    <Text style={styles.text}>{'  '}Lleva un seguimiento de tu progreso</Text>
                </View>
                <View style={styles.container2}>
                    <Ionicons name="bulb-outline" size={30}></Ionicons>
                    <Text style={styles.text}>{'  '}Puedes ajustar los ejercicios del plan</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    style={styles.button} 
                    onPress={handleNavigate}
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    imageContainer: {
        //backgroundColor: '#707070',
        alignItems: 'center',
        margin: 20,
    },
    image: {
        height: '100',
        overflow: 'hidden'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 0,
        margin: 20
    },
    title2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15
    },
    subtitle: {
        fontSize: 17,
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
    userContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        padding: 20
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center'
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