import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function FormScreen1(props) {

    const [gender, setGender] = useState('')

    return (
        <View>
            <Text> Hola desde el formulario porq si </Text>
            <Text> Aquí pediremos el género </Text>
        </View>
    )
}