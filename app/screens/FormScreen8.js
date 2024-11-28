import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function FormScreen8(props) {

    const [activityLevel, setActivityLevel] = useState('')

    return (
        <View>
            <Text> Hola desde el formulario porq si </Text>
            <Text> Aquí el plan está listo y con todos los detalles importantes para el user </Text>
            <Text> Aquí una imagen referencial de un plan adaptado y dinámico </Text>
        </View>
    )
}