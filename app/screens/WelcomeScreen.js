import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View,  } from 'react-native'

export default function WelcomeScreen(props) {

    return (
        <View>
            <View>
                {/*Texto de bienvenida*/}
                <Text>Este es la pantalla 1 - bienvenida </Text>
            </View>
            <View>
                {/*tarjeta para poder ingresar cuenta*/}
                <Text>Descubre </Text>
                <Pressable onPress={() => props.navigation.navigate('Auth')}>
                    <Text>Continuar con correo electrónico</Text>
                </Pressable>
            </View>
        </View>
    )
}