import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, Image } from 'react-native'

export default function ExercisesScreen(props) {
    //Este es la pantalla 2 - Ejercicios y desafíos
    return (
        <View style={styles.container}>
            <View
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => props.navigation.navigate('exercisesCategory', {
                    screen: 'upperBody'
                })}
            >
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <Text style={styles.text}>CUERPO SUPERIOR</Text>
                    <Image 
                        source={require('../../assets/upper-body.png')}
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10
                        }}    
                    />
                </LinearGradient>
            </View>
            <View
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => props.navigation.navigate('exercisesCategory', {
                    screen: 'core'
                })}
            >
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <Text style={styles.text}>CORE</Text>
                    <Image 
                        source={require('../../assets/core.png')}
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10
                        }}       
                    />
                </LinearGradient>
            </View>
            <View
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => props.navigation.navigate('exercisesCategory', {
                    screen: 'lowerBody'
                })}
            >
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <Text style={styles.text}>CUERPO INFERIOR</Text>
                    <Image 
                        source={require('../../assets/lower-body.png')}
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10
                        }}       
                    />
                </LinearGradient>
            </View>
            <View
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => props.navigation.navigate('exercisesCategory', {
                    screen: 'cardio'
                })}
            >
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <Text style={styles.text}>CARDIO</Text>
                    <Image 
                        source={require('../../assets/cardio.png')}
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10
                        }}   
                    />
                </LinearGradient>
            </View>
            <View
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => props.navigation.navigate('exercisesCategory', {
                    screen: 'stretchings'
                })}
            >
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <Text style={styles.text}>ESTIRAMIENTOS</Text>
                    <Image 
                        source={require('../../assets/stretchings.png')}
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10
                        }}   
                    />
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5'
    },
    subcontainer: {
        margin: 20,
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 10
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        color: 'white'
    },
    subcontainer2: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15
    }
});