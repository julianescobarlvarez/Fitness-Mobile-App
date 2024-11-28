import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function FormScreen5(props) {

    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)

    return (
        <View>
            <Text> Hola desde el formulario porq si </Text>
            <Text> Aquí pediremos la altura (cm / pies y pulgadas) </Text>
            <Text> Aquí pediremos el peso (kg / libras) </Text>
        </View>
    )
}