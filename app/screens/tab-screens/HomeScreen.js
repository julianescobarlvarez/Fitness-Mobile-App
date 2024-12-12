import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, Image, ImageBackground, BackHandler } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen(props) {

    // Usar useFocusEffect para que el evento solo esté activo cuando esta pantalla esté enfocada
    useFocusEffect(
        React.useCallback(() => {
        const onBackPress = () => {
            // Cerrar la aplicación cuando se presiona el botón de retroceso
            BackHandler.exitApp();
            return true; // Prevenir la acción predeterminada
        };

        // Registrar el evento de retroceso
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Limpiar el evento cuando la pantalla pierda el foco
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    //Se mostrará un resumen gráfico del plan del usuario (si existe)
    //Se mostrará una recomendación para crear un plan (si no existe)
    return (
        <View style={styles.container}> 
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.title}>EXPLORA TU POTENCIAL</Text>
                    <Text style={styles.textTitle}>
                        Cada cuerpo es diferente. Nuestra inteligencia artificial 
                        crea un plan de entrenamiento basado en tu nivel, preferencias 
                        y objetivos.
                    </Text>
                </View>
                <Pressable
                    onPress={() => props.navigation.navigate('form')}
                >
                    <ImageBackground
                        source={require("../../assets/main-photo.png")} 
                        style={styles.container2}
                        resizeMode="cover"
                    >
                        <View style={styles.overlay}> 
                            <Text style={styles.text}>
                                Crea un entrenamiento personalizado con IA
                            </Text>
                        </View>
                    </ImageBackground>
                </Pressable>
                <Text style={styles.title2}>DESAFÍOS</Text>
                <Text style={styles.textTitle2}>Principiante</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.container3}>
                        <Text>Desafío de Caminata Diaria (7 días)</Text>
                        <Text>Camina 30 minutos al día durante 7 días consecutivos</Text>
                    </View>
                    <View style={styles.container3}>
                        <Text>Desafío de Flexiones de Rodillas (5 días)</Text>
                        <Text>Realiza 3 series de 10 flexiones de rodillas al día durante 5 días seguidos</Text>
                    </View>
                    <View style={styles.container3}>
                        <Text>Desafío de Abdominales Básicos (7 días)</Text>
                        <Text>Haz 3 series de 12 abdominales básicos al día durante 7 días consecutivos</Text>
                    </View>
                </ScrollView>
                <Text style={styles.textTitle2}>Intermedio</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.container3}>
                        <Text>Desafío de Sentadillas (10 días)</Text>
                        <Text>Realiza 3 series de 15 sentadillas al día durante 10 días</Text>
                    </View>
                    <View style={styles.container3}>
                        <Text>Desafío de Plancha (5 días)</Text>
                        <Text>Mantén una plancha por 30 segundos, 3 veces al día durante 5 días consecutivos</Text>
                    </View>
                    <View style={styles.container3}>
                        <Text>Desafío de Cardio Rápido (7 días)</Text>
                        <Text>
                            Realiza 20 minutos de actividad cardiovascular moderada (como trotar, saltar la cuerda, 
                            bicicleta estática) durante 7 días
                        </Text>
                    </View>
                </ScrollView>
                <Text style={styles.textTitle2}>Avanzado</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.container3}>
                        <Text>Desafío de HIIT (5 días)</Text>
                        <Text>
                            Realiza una rutina de entrenamiento de intervalos de alta intensidad (HIIT) de 20 minutos,
                            5 días consecutivos
                        </Text>
                    </View>
                    <View style={styles.container3}>
                        <Text>Desafío de Sentadillas con Salto (10 días)</Text>
                        <Text>
                            Realiza 4 series de 15 sentadillas con salto cada día durante 10 días consecutivos
                        </Text>
                    </View>
                    <View style={styles.container3}>
                        <Text>Desafío de Flexiones Avanzadas (7 días)</Text>
                        <Text>
                            Realiza 4 series de 15 flexiones avanzadas (pueden ser flexiones con palmada o flexiones declinadas) 
                            al día durante 7 días
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.container4}></View>
            </ScrollView>
            <View 
                style={styles.button} 
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => props.navigation.navigate('form')}
            >
                <Ionicons 
                    name="add-circle-outline" 
                    size={35} 
                    color={'white'} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15,
    },
    container2: {
        backgroundColor: '#707070',
        marginTop: 15,
        height: 230,
        borderRadius: 10,
        overflow: 'hidden'
    },
    container3: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginRight: 15
    },
    container4: {
        marginBottom: 90
    },
    button: {
        position: 'absolute', 
        bottom: 15,
        right: 0,
        backgroundColor: '#4745ff', 
        width: 60,
        height: 60,
        padding: 10,
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Filtro oscuro sobre la imagen para que el texto sea legible
        marginTop: 160
    },
    textTitle: {
        fontSize: 17,
        marginTop: 15
    },
    textTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15
    },
    text: {
        color: 'white',
        fontSize: 18,
        padding: 15,
        fontWeight: 'bold',
    },
});