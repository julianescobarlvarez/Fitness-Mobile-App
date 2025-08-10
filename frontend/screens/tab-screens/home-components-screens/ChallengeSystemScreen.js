import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, ImageBackground, Image, Modal } from 'react-native'
//import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
//import { Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import findAllChallengesService from '../../../services/findAllChallengesService'
import findUserIdService from '../../../services/findUserIdService'
import challengeCompletedService from '../../../services/challengeCompletedService'

export default function ChallengeSystemScreen() {
    const [challenges, setChallenges] = useState([])
    const [userId, setUserId] = useState('')
    const [email, setEmail] = useState('')
    const [challengeState, setChallengeState] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuVisible2, setMenuVisible2] = useState(false)
    const [loading, setLoading] = useState(true)
    const [challengeName, setChallengeName] = useState('')
    const [challengeText, setChallengeText] = useState('')
    const [challengeLvl, setChallengeLvl] = useState('')
    const [actualChallenge, setActualChallenge] = useState('')
    const [backgroundChallenge, setBackgroundChallenge] = useState('#f5f5f5')
    const [bottomChallenge, setBottomChallenge] = useState('#f5f5f5')

    useEffect(() => {
        const searchChallenges = async () => {
            try {
                const response = await findAllChallengesService()
                const email = await AsyncStorage.getItem('emailToken')
                
                if(response){
                    setChallenges(response.challenges)
                }

                if(email){
                    const actualUser = await findUserIdService(email)
                    setEmail(email)
                    setUserId(actualUser.user._id)
                }

            } catch (error) {
                console.error('Error al buscar la lista de desafíos:', error)
            } finally {
                setLoading(false)
            }
        }
        searchChallenges()
    }, [challengeState])

    //Maneja el estado de visibilidad del menu desplegable de opciones
    const toggleMenu = () => {
        setMenuVisible(!menuVisible)
    }

    //Maneja el estado de visibilidad del menu desplegable de opciones
    const toggleMenu2 = () => {
        setMenuVisible2(!menuVisible2)
    }

    //Maneja el estado del color de fondo para cada desafío
    const toggleChallengeColor = () => {
        setBackgroundChallenge('#f5f5f5')
        setBottomChallenge('#f5f5f5')
        toggleMenu()
    }

    const checkIfDisabled = (challenge) => {
        if(challenge.challengeCompletedList.includes(userId)){
            return true
        }
        else{
            return false
        }
    }

    //Maneja el desafío presionado, junto con sus características
    const handleTouch = (challenge) => {
        //console.log('desafío: ', challenge.name)
        //console.log('lista de usuarios: ', challenge.challengeCompletedList)
        setActualChallenge(challenge)
        setChallengeName(challenge.name)
        setChallengeText(challenge.description)
        setChallengeLvl(challenge.level)

        if(challenge.level == 'Principiante'){
            setBackgroundChallenge('#A7C5EB')
            setBottomChallenge('#4A90E2')
        }
        else if(challenge.level == 'Intermedio'){
            setBackgroundChallenge('#B8B8B8')
            setBottomChallenge('#8A8A8A')
        }
        else{
            setBackgroundChallenge('#FFD700')
            setBottomChallenge('#D4AF37')
        }
        toggleMenu()

    }

    const handleTouchButton = async() => {
        toggleMenu2()
        try{
            const response = await challengeCompletedService(actualChallenge._id, email)
            
            if(response){
                console.log('Se envió con éxito')
                setTimeout(() => {
                    setMenuVisible2(false)
                    setChallengeState(!challengeState)
                    toggleMenu()
                },2000)
            }
        } catch (error) {
            console.error('Error al buscar el usuario en la lista de desafío completado:', error)
            setTimeout(() => {
                setMenuVisible2(false)
            },2000)
        }
    }

    if (loading) {
        return (
            <View></View>
        )
    }

    const levels = ['Principiante', 'Intermedio', 'Avanzado']

    const colors = {
        'Principiante': ['#A7C5EB', '#4A90E2'],
        'Intermedio': ['#B8B8B8', '#8A8A8A'],
        'Avanzado': ['#FFD700', '#D4AF37']
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#f5f5f5' }}>
                <Text style={styles.title2}>DESAFÍOS</Text>
                {levels.map((lvl) => {
                    const filtered = challenges.filter(challenge => challenge.level === lvl)
                    return (
                        <View key={lvl} style={styles.section}>
                            <Text style={styles.textTitle2}>{lvl}</Text>
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                snapToAlignment="center"
                                decelerationRate="fast"
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                            >
                                {filtered.map((challenge) => (
                                    <Pressable
                                        key={challenge._id}
                                        onPress={() => handleTouch(challenge)}
                                        disabled={checkIfDisabled(challenge)}
                                        style={({ pressed }) => [
                                            { opacity: pressed ? 0.8 : 1 }
                                        ]}
                                    >
                                        <LinearGradient
                                            colors={colors[lvl]}
                                            style={[styles.container3, { width: 320, marginHorizontal: 10, height: 150 }]}
                                            start={{ x: 0.4, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Text style={styles.titleContain}>{challenge.name}</Text>
                                            <Text style={styles.textContain}>{challenge.description}</Text>
                                            {checkIfDisabled(challenge) && (
                                                <Text style={styles.lockText}>✅ Completado</Text>
                                            )}
                                        </LinearGradient>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )
                })}

                <Modal visible={menuVisible} transparent animationType="fade">
                    <Pressable 
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)', 
                            flex: 1, 
                            justifyContent: 'center'
                        }}
                        onPress={() => toggleChallengeColor()}
                    >
                        <Pressable onPress={() => {}}>
                            <ImageBackground
                                source={require("../../../assets/challenge.png")} 
                                resizeMode="contain"
                                style={[styles.sectionContainer, {backgroundColor: backgroundChallenge}]}
                            >
                                <View style={[styles.overlay, {backgroundColor: backgroundChallenge}]}/>
                                <View style={{ marginHorizontal: 15 }}>
                                    <Text style={styles.sectionTitle}>{challengeName}</Text>
                                    <Text style={styles.sectionText}>{challengeText}</Text>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <View style={[styles.firstBottomContainer, {backgroundColor: bottomChallenge}]}>
                                        {challengeLvl == 'Principiante' ? (
                                            <Image
                                                source={require("../../../assets/medals/beginner-medal.png")} 
                                                style={{ 
                                                    width: 45, 
                                                    height: 45,
                                                }}
                                            />
                                        ):(null)}    
                                        {challengeLvl == 'Intermedio' ? (
                                            <Image
                                                source={require("../../../assets/medals/intermediate-medal.png")} 
                                                style={{ 
                                                    width: 45, 
                                                    height: 45,
                                                }}
                                            />
                                        ):(null)}
                                        {challengeLvl == 'Avanzado' ? (
                                            <Image
                                                source={require("../../../assets/medals/advance-medal.png")} 
                                                style={{ 
                                                    width: 45, 
                                                    height: 45,
                                                }}
                                            />
                                        ):(null)}     
                                            
                                        <View style={styles.buttonContainer}>
                                            <Pressable 
                                                style={styles.button2} 
                                                onPress={() => handleTouchButton()}
                                            >
                                                <Text style={styles.textButton2}>Completar desafío</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Pressable>
                    </Pressable>
                </Modal>
                <Modal visible={menuVisible2} transparent animationType="fade">
                    <Pressable
                        style={{
                                backgroundColor: 'rgba(0,0,0,0.3)', 
                                flex: 1, 
                                justifyContent: 'center'
                            }}
                        onPress={() => {}}
                    />
                </Modal>
                <View style={{ marginVertical: 50 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    container3: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '363'
    },
    container4: {
        marginVertical: 15
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
        marginTop: 20,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
        marginBottom: 15,
        paddingHorizontal: 15
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
    },
    sectionContainer: {
        backgroundColor: '#f5f5f5',
        height: 300,
        borderRadius: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        //marginVertical: 15
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center'
    },
    sectionText: {
        fontSize: 18,
        marginTop: 25,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#f5f5f5',
        opacity: 0.9,
        borderRadius: 15
    },
    button2: {
        backgroundColor: '#4745ff',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        elevation: 4
    },
    textButton2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    bottomContainer: {
        flex:1, 
        justifyContent: 'flex-end', 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15
    },
    firstBottomContainer: {
        flexDirection: 'row',
        backgroundColor: 'blue', 
        height: 80, 
        justifyContent: 'space-between', 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15,
        paddingVertical: 15,
        paddingLeft: 35,
        paddingRight: 110
    },
    lockText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    }
})