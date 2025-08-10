import React, { useState, useCallback } from 'react'
import { Pressable, StyleSheet, Text, View, Alert, Image, Animated } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import findUserIdService from '../../services/findUserIdService'

// Pantalla del perfil de usuario
export default function ProfileConfigScreen(props) {
    const { setIsAuthenticated } = useAuth()
    const defaultProfile = "../../assets/profile.png"
    const [fadeAnim] = useState(new Animated.Value(0))
    const [refreshKey, setRefreshKey] = useState(0)
    const [user, setUser] = useState(null)
    
    useFocusEffect(
        useCallback(() => {
            const actualPlan = async () => {
                try {
                    const email = await AsyncStorage.getItem('emailToken')
                    if(email){
                        const actualUser = await findUserIdService(email)
                        setUser(actualUser.user)
                    }
                } catch (err) {
                    console.error(err)
                } finally {
                    setIsLoading(false)
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true
                    }).start()
                }
            }
            actualPlan()
        }, [refreshKey])
    )

    // Para cerrar sesión en la aplicación
    const handleSignOut = async () => {
        try {
            // Se elimina el token de AsyncStorage
            await AsyncStorage.removeItem('authToken')

            //Se elimina el email vigente del usuario de AsyncStorage
            await AsyncStorage.removeItem('emailToken')

            //Se elimina la vigencia de plan del usuario de AsyncStorage
            await AsyncStorage.removeItem('planToken')

            setIsAuthenticated(false)

        } catch (error) {
            console.log("Error al cerrar sesión: ", error)
            Alert.alert('Error', 'Hubo un error al cerrar sesión')
        }
      }
    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 20
                }}
            >
                <Image
                    source={require(defaultProfile)} 
                    style={{ 
                        borderRadius: 10,
                        width: 130, 
                        height: 110,
                    }}
                />
                <Text 
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>Julian</Text>
            </View>
            <View style={styles.challengeContainer}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Desafíos completados</Text>
                <View 
                style={styles.challengeSubContainer}>
                    <Image
                        source={require("../../assets/medals/beginner-medal.png")} 
                        style={{ 
                            width: 50, 
                            height: 50,
                        }}
                    />
                    <Image
                        source={require("../../assets/medals/intermediate-medal.png")} 
                        style={{ 
                            width: 50, 
                            height: 50,
                        }}
                    />
                    <Image
                        source={require("../../assets/medals/advance-medal.png")} 
                        style={{ 
                            width: 50, 
                            height: 50,
                        }}
                    />
                </View>
                <View style={styles.medalContainer}>
                    <Text style={{fontSize: 18, paddingVertical: 10}}>{user == null ? 0 : user.beginnerMedal}</Text>
                    <Text style={{fontSize: 18, paddingVertical: 10}}>{user == null ? 0 : user.intermediateMedal}</Text>
                    <Text style={{fontSize: 18, paddingVertical: 10}}>{user == null ? 0 : user.advanceMedal}</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <Pressable onPress={handleSignOut} style={styles.buttonContainer2}>
                    <Text style={{
                        textAlign: 'center'
                    }}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
    },
    challengeContainer: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        padding: 20,
        borderRadius: 10,
    },
    challengeSubContainer: {
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 15, 
        padding: 15, 
        marginTop: 15, 
        justifyContent: 'space-between', 
        paddingBottom: 0
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    buttonContainer: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginTop: 15,
        padding: 20,
        borderRadius: 10,
    },
    buttonContainer2: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginTop: 15,
        padding: 20,
        borderRadius: 10,
    },
    medalContainer: {
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 35, 
        justifyContent: 'space-between'
    }
})