import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native'
import { signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore'
import { dbFirebase } from '../../../../.expo/credentials'

export default function ExercisesListScreen(props) {
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-lateral-raises.png')}
                            style={{ 
                                marginLeft: 10,
                                borderRadius: 10,
                                marginRight: 15
                            }}    
                        />
                        <View>
                            <Text style={styles.text}>Dumbbell Lateral Raise</Text>
                            <Text style={styles.text}>Series: 3-4</Text>
                            <Text style={styles.text}>Repeticiones: 10-15</Text>
                            <Text style={styles.text}>Peso: 4-10</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-single-lateral-raises.png')}
                            style={{ 
                                marginLeft: 10,
                                borderRadius: 10,
                                marginRight: 15
                            }}    
                        />
                        <View>
                            <Text style={styles.text}>Dumbbell Single Lateral Raise</Text>
                            <Text style={styles.text}>Series: 3-4</Text>
                            <Text style={styles.text}>Repeticiones: 10-12</Text>
                            <Text style={styles.text}>Peso: 4-8</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-military-press.png')}
                            style={{ 
                                marginLeft: 10,
                                borderRadius: 10,
                                marginRight: 15,
                            }}    
                        />
                        <View>
                            <Text style={styles.text}>Dumbbell Military Press</Text>
                            <Text style={styles.text}>Series: 3-4</Text>
                            <Text style={styles.text}>Repeticiones: 6-10</Text>
                            <Text style={styles.text}>Peso: 8-20</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-dumbbell-front-raises.png')}
                            style={{ 
                                marginLeft: 10,
                                borderRadius: 10,
                                marginRight: 15,
                            }}    
                        />
                        <View>
                            <Text style={styles.text}>Dumbbell Front Raise</Text>
                            <Text style={styles.text}>Series: 3-4</Text>
                            <Text style={styles.text}>Repeticiones: 8-12</Text>
                            <Text style={styles.text}>Peso: 5-12</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image 
                            source={require('../../../assets/exercises-strength/exercises-strength-image/shoulders-exercise-seated-dumbbell-military-press.png')}
                            style={{ 
                                marginLeft: 10,
                                borderRadius: 10,
                                marginRight: 15,
                            }}    
                        />
                        <View>
                            <Text style={styles.text}>Seated Dumbbell Military Press</Text>
                            <Text style={styles.text}>Series: 3-4</Text>
                            <Text style={styles.text}>Repeticiones: 6-10</Text>
                            <Text style={styles.text}>Peso: 10-20</Text>
                        </View>
                    </LinearGradient>
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
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    subcontainer3: {
        flexDirection: 'row',
        flexShrink: 1,
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    }
});