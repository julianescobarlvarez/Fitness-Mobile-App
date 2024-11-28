import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function FormScreen4(props) {

    const [age, setAge] = useState(0)

    return (
        <View>
            <Text> Hola desde el formulario porq si </Text>
            <Text> Aquí pediremos la edad </Text>
        </View>
    )
}