import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function FormScreen0(props) {
    
    const [name, setName] = useState('')

    return (
        <View>
            <Text> Hola desde el formulario porq si </Text>
            <Text> Aquí pediremos el nombre </Text>
        </View>
    )
}