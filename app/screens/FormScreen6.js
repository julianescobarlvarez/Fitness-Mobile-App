import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function FormScreen6(props) {

    const [physicalLevel, setPhysicalLevel] = useState('')

    return (
        <View>
            <Text> Hola desde el formulario porq si </Text>
            <Text> Aquí una imagen referencial </Text>
            <Text> Aquí pediremos el nivel físico (cuantas flexiones haces?) </Text>
        </View>
    )
}