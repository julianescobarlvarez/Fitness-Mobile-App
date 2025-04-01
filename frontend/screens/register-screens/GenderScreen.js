import { StyleSheet, Text, View, TextInput, Pressable, Alert, Animated} from 'react-native'
import React, { useState } from 'react'
//import { doc, getDoc, updateDoc } from 'firebase/firestore'
//import { auth, dbFirebase } from '../../../.expo/credentials'

//Pantalla que requiere el género del usuario
export default function GenderScreen(props) {
    const { email, password, name } = props.route.params
    const [gender, setGender] = useState('')
    
    // Usamos un array de Animated.Values para manejar la opacidad de cada imagen
    const [opacities, setOpacities] = useState([new Animated.Value(1), new Animated.Value(1)])
    const [scale, setScale] = useState([new Animated.Value(1), new Animated.Value(1)])
    const [highlightedIndex, setHighlightedIndex] = useState(null) 
    const [previousIndex, setPreviousIndex] = useState(null);
    
    // Función para manejar el parpadeo de la imagen seleccionada
    const handlePressIn = (index) => {
        setHighlightedIndex(index)
        
        // Si hay una imagen previamente seleccionada, restaurar su escala a 1
        if (previousIndex !== null && previousIndex !== index) {
            Animated.spring(scale[previousIndex], {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }

        // Crea una secuencia de animaciones solo para la imagen que se tocó
        Animated.sequence([
            Animated.timing(opacities[index], {
                toValue: 0, // Desaparece
                duration: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacities[index], {
                toValue: 1, // Vuelve a aparecer
                useNativeDriver: true,
            }),
        ]).start()
        
        // Animación de escala (resaltar la imagen)
        Animated.spring(scale[index], {
            toValue: 1, // Aumentar el tamaño de la imagen al 120%
            useNativeDriver: true,
        })
        Animated.spring(scale[index], {
            toValue: 1.3, // Vuelve a su tamaño original
            useNativeDriver: true,
        }).start()

        // Actualiza el estado de la imagen seleccionada
        setPreviousIndex(index);
    };

    //Se hace el registro en Firebase junto con otros datos del usuario
    const handleNavigate = async() => {
        props.navigation.navigate('registerService', {email, password, name, gender: gender})
    }
    
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>¿Cuál es tu sexo?</Text>
            </View>
            <View style={styles.textContainer}>
                <Pressable 
                    onPress={() => setGender('girl')} 
                    onPressIn={() => handlePressIn(0)}
                >
                    <Animated.Image
                        source={require("../../assets/girl.png")} 
                        style={{ 
                            opacity: opacities[0], 
                            transform: [{ scale: scale[0] }],  
                            backgroundColor: highlightedIndex === 0 ? '#4745ff' : '#f5f5f5',
                            borderRadius: 10,
                            width: 130, 
                            height: 210
                        }}
                    /> 
                </Pressable>
                <Pressable 
                    onPress={() => setGender('man')} 
                    onPressIn={() => handlePressIn(1)}
                >
                    <Animated.Image
                        source={require("../../assets/man.png")} 
                        style={{ 
                            opacity: opacities[1], 
                            transform: [{ scale: scale[1] }], 
                            backgroundColor: highlightedIndex === 1 ? '#4745ff' : '#f5f5f5',
                            borderRadius: 10,
                            width: 130, 
                            height: 210
                        }}
                    />
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={gender === ''} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, gender === '' && styles.disabledButton]}    
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>
            </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 150,
    },
    title: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 100
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    nextButton: {
        backgroundColor: '#4745ff',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0', 
    },
    textContainer: {
        flexDirection: 'row',  
        alignItems: 'center',  
        justifyContent: 'space-between',
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 5,
    }
})