import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
//import { doc, getDoc, updateDoc } from 'firebase/firestore'
//import { auth, dbFirebase } from '../../../.expo/credentials'

//Pantalla que requiere el nombre del usuario
export default function NameScreen(props) {
    const { email, password } = props.route.params
    const [name, setName] = useState('')

    const handleNavigate = async() => {
        // Navegar a la siguiente pantalla, pasando el valor capturado
        console.log(name)
        props.navigation.navigate('gender', {email, password, name: name})
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Crea tu nombre de usuario</Text>
            </View>
            <View style={styles.nameSection}>
                <TextInput style={styles.text} placeholder='Nombre' value={name} onChangeText={setName}></TextInput>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={name === ''} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, name === '' && styles.disabledButton]}     
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>    
            </View>        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 70
    },
    title: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 80
    },
    nameSection: {
        alignItems: 'center',
        textAlign: 'center',
    },
    text: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#black', 
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10, 
        borderRadius: 10, 
        backgroundColor: '#f5f5f5', 
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    nextButton: {
        backgroundColor: '#4745ff',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0',
    },
})