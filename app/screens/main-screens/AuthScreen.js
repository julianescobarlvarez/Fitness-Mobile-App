import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth } from '../../../.expo/credentials'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function AuthScreen(props) {
    const [registering, setRegistering] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    //Ingresar los otros datos o estados en otra pantalla (form)
    const authentication = async() => {
        
        if(registering){
            try{
                props.navigation.navigate('userRegister', { email: email, password: password })
            } catch (error){
                Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres')
            }
        } else{
            try{
                await signInWithEmailAndPassword(auth, email, password)
                //Alert.alert('Iniciando...', 'accediendo al sistema')
            } catch (error){
                Alert.alert('Error', 'No se encuentra esta cuenta en el sistema')
            }
        }
    }    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <TextInput 
                    //underlineColorAndroid="transparent" 
                    placeholder='Escribe tu correo electrónico' 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            <View>
                <TextInput 
                    placeholder='Escribe tu contraseña' 
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword} //mínimo 6 dígitos para que funcione
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Pressable onPress={authentication}>
                    <Text style={styles.containerOptionText}>{registering ? "Regístrate" : "Inicia sesión"}</Text>
                </Pressable>
            </View>
            <View>
                <Text>{registering ? "Si ya tienes una cuenta" : "No tienes una cuenta?"}</Text>
                <Pressable onPress={() => setRegistering(!registering)}>
                    <Text style={styles.containerText2}>{registering ? "Inicia sesión" : "Regístrate"}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    containerOptionText:{
        color: 'black',
        marginTop: 10,
        marginBottom: 15,
    },
    container2: {
        marginTop: 25
    },
    containerText2:{
        textAlign: 'center'
    },
    input: {
      width: 200,
      height: 50,
      borderWidth: 1,
      borderColor: "#707070",
      borderRadius: 10,
      margin: 5
    },
});