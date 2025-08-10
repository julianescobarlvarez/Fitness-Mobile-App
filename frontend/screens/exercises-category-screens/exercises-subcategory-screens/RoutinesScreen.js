import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Alert, ScrollView, Image } from 'react-native'

// Pantalla de rutinas con equipamiento y sin equipamiento
export default function RoutinesScreen(props) {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/*<Text style={styles.title}>Sin equipamento</Text>*/}
                {/*<View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 1</Text>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 2</Text>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 3</Text>
                    </LinearGradient>
                </View>
                */}
                <Text style={styles.title}>Con equipamento</Text>
                <View
                    onStartShouldSetResponder={() => true} 
                    onResponderStart={() => props.navigation.navigate('exercisesList')}
                >
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 1</Text>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 2</Text>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 3</Text>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 4</Text>
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Rutina 5</Text>
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
        fontSize: 18,
        padding: 15,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    subcontainer3: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    }
});