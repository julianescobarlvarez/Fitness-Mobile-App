import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, Image, ImageBackground, BackHandler } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import { collection, doc, getDocs } from 'firebase/firestore' 
import { auth, dbFirebase } from '../../../.expo/credentials'

export default function HomeScreen(props) {
    const [list, setList] = useState([])
    const [challenge1, setChallenge1] = useState(false)
    const [challenge2, setChallenge2] = useState(false)
    const [challenge3, setChallenge3] = useState(false)
    const [challenge4, setChallenge4] = useState(false)
    const [challenge5, setChallenge5] = useState(false)
    const [challenge6, setChallenge6] = useState(false)
    const [challenge7, setChallenge7] = useState(false)
    const [challenge8, setChallenge8] = useState(false)
    const [challenge9, setChallenge9] = useState(false)
    
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

    // Obtener valores de medallas de desafío desde Firestore
        useEffect(() => {
            const getChallenges = async() => {
                try {
                    const querysnapshot = await getDocs(collection(dbFirebase, 'challenges'))
                    const docs = []
    
                    querysnapshot.forEach((doc)=>{
                        const { state } = doc.data()
    
                        docs.push({
                            id: doc.id,
                            state: state,
                        })
                    })
                    setList(docs)
                } catch (error) {
                    console.log(error)
                }
            };
            getChallenges();
        }, []);

    const handleChallenge1 = () => {

    }
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
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '340'
    },
    container4: {
        marginBottom: 90
    },
    container5: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '350'
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
    titleContain: {
        fontWeight: 'bold', 
        fontSize: 18
    },
    textContain: {
        fontSize: 16
    }
});