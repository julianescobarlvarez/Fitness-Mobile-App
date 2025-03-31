import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'

export default function WelcomeScreen(props) {

    return (
        <View style={styles.container}>
            <View>
                <ImageBackground 
                    source={require('../../assets/welcome.png')} 
                    style={{
                        height: 500,
                    }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.foregroundView}>
                <Text style={styles.text}>Regístrate</Text>
                <View style={styles.container2}>
                    <Pressable onPress={() => props.navigation.navigate('auth')}>
                        <Text style={styles.text2}>Continuar con correo electrónico</Text>
                    </Pressable>
                </View>
                <Text style={styles.text3}>
                    Al continuar, aceptas nuestros términos de servicio y política de 
                    Privacidad
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container2: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        marginTop: 20
    },
    foregroundView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '40%',
        backgroundColor: '#303038',
        padding: 20,
        borderRadius: 10,
        zIndex: 1,  // Asegura que este esté por encima
        marginHorizontal: 'auto'
    },
    text: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    text2: {
        fontSize: 18,
        textAlign: 'center',
    },
    text3: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginTop: 55
    },
})