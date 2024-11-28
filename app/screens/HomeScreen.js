import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View,  } from 'react-native'

export default function HomeScreen(props) {

    return (
        <View>
            <View>
                {/*Texto de bienvenida*/}
                <Text>Este es la pantalla 1 - Información del plan </Text>
                <Text> 1 - Información del plan </Text>
                <Text> 2 - Ejercicios </Text>
                <Text> 3 - Progreso </Text>
                <Text> 4 - Perfil y configuraciones </Text>
                <Text> Aquí van 4 pantallas laterales (como whatsapp) </Text>
                <Text> Para ello, habrá una barra horizontal abajo (como whatsapp) </Text>
            </View>
        </View>
    )
}