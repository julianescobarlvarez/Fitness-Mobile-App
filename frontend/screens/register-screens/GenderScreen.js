import { StyleSheet, Text, View, TextInput, Pressable, Alert, Animated} from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import registerService from '../../services/registerService'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Pantalla que requiere el género del usuario
export default function GenderScreen(props) {
    const { email, password, name } = props.route.params
    const [gender, setGender] = useState('')
    const { setIsAuthenticated } = useAuth()
  
    // Se usa un array de Animated.Values para manejar la opacidad de cada imagen
    const [opacities, setOpacities] = useState([new Animated.Value(1), new Animated.Value(1)])
    const [scale, setScale] = useState([new Animated.Value(1), new Animated.Value(1)])
    const [highlightedIndex, setHighlightedIndex] = useState(null) 
    const [previousIndex, setPreviousIndex] = useState(null)
    
    // Función para manejar el parpadeo de la imagen seleccionada
    const handlePressIn = (index) => {
        setHighlightedIndex(index)
        
        // Si hay una imagen previamente seleccionada, se restaura su escala a 1
        if (previousIndex !== null && previousIndex !== index) {
            Animated.spring(scale[previousIndex], {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }

        // Crea una secuencia de animaciones solo para la imagen que se tocó
        Animated.sequence([
            Animated.timing(opacities[index], {
                toValue: 0, // Hace que la imagen desaparezca
                duration: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacities[index], {
                toValue: 1, // Hace que la imagen aparezca
                useNativeDriver: true,
            }),
        ]).start()
        
        // Animación de escala para hacer resaltar la imagen
        Animated.spring(scale[index], {
            toValue: 1, // Hace que la imagen aumente el tamaño de la imagen al 120%
            useNativeDriver: true,
        })
        Animated.spring(scale[index], {
            toValue: 1.3, // Hace que la imagen vuelva a su tamaño original
            useNativeDriver: true,
        }).start()

        // Actualiza el estado de la imagen seleccionada
        setPreviousIndex(index)
    };

    // Para manejar el registro del usuario
    const handleRegister = async() => {
        
        // Crea el objeto de datos del usuario para el registro
        const userData = {
            email: email,
            password: password,
            name: name,
            gender: gender,
        }

        try {
            // Se llama al servicio para registrar al usuario
            const data = await registerService(userData)

            // Si el registro fue exitoso, el servidor devolverá un token
            const token  = data.data.token
            console.log('Token JWT:', token)

            // Se usa el servicio de AsyncStorage para guardar el token de autenticación
            await AsyncStorage.setItem('authToken', token)
            console.log('Se ha llamado al servicio de AsyncStorage con éxito')

            //Se usa el servicio de AsyncStorage para guarda el email del usuario
            await AsyncStorage.setItem('emailToken', email)
            console.log('Se ha llamado al servicio de AsyncStorage con éxito')

            setIsAuthenticated(true)
    
        } catch (err) {
            setError(err.message) // Se muestra el error si algo salió mal
            console.log('error registrado')
        } 
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
                    onPress={handleRegister}
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