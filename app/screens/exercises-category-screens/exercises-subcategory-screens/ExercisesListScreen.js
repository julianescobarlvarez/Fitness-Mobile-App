import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Alert, ScrollView, Image, FlatList } from 'react-native'
import { collection, doc, getDocs } from 'firebase/firestore'
import { dbFirebase } from '../../../../.expo/credentials'

export default function ExercisesListScreen(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ejercicios</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <LinearGradient
                        colors={['#A7C5EB', '#4A90E2']}
                        style={styles.subcontainer2}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-front-raises.png')} 
                            style={styles.image} 
                            resizeMode="contain"
                        />   
                        <View style={{alignItems: 'baseline', flex: 1, padding: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Dumbbell Front Raise</Text>
                            <Text style={{fontSize: 16}}>Sets: 3-4</Text>
                            <Text style={{fontSize: 16}}>Reps: 8-12</Text>
                            <Text style={{fontSize: 16}}>Weight: 5-12 kg</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['#A7C5EB', '#4A90E2']}
                        style={styles.subcontainer2}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-front-raises.png')} 
                            style={styles.image} 
                            resizeMode="contain"
                        />   
                        <View style={{alignItems: 'baseline', flex: 1, padding: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Dumbbell Military Press</Text>
                            <Text style={{fontSize: 16}}>Sets: 3-4</Text>
                            <Text style={{fontSize: 16}}>Reps: 6-10</Text>
                            <Text style={{fontSize: 16}}>Weight: 8-20 kg</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['#A7C5EB', '#4A90E2']}
                        style={styles.subcontainer2}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-front-raises.png')} 
                            style={styles.image} 
                            resizeMode="contain"
                        />   
                        <View style={{alignItems: 'baseline', flex: 1, padding: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Dumbbell Single Lateral Raise</Text>
                            <Text style={{fontSize: 16}}>Sets: 3-4</Text>
                            <Text style={{fontSize: 16}}>Reps: 10-12</Text>
                            <Text style={{fontSize: 16}}>Weight: 4-8 kg</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Pressable 
                        style={styles.nextButton}     
                    >
                        <Text style={styles.textButton}>Continuar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15
    },
    text: {
        color: '#f1f1f1',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15,
    },
    subcontainer2: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    subcontainer3: {
        flexDirection: 'row',
        flexShrink: 1,
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100
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
});