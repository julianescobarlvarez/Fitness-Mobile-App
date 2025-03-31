import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Alert, ImageBackground} from 'react-native'
import { auth } from '../../../.expo/credentials'
import { signOut } from 'firebase/auth'

export default function StretchingScreen() {

    return (
        <View style={styles.container}>
            <View>
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <Text style={styles.text}>ESTIRAMIENTOS</Text>
                    <ImageBackground 
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
        marginLeft: 20,
        marginRight: 20
    }
});