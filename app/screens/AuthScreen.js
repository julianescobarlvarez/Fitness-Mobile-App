import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

export default function AuthScreen(props) {
    const [registering, setRegistering] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //Ingresar los otros datos o estados en otra pantalla (form)
    
    const authentication = async() => {
        
        if(registering){
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                
                //Se guardan solo el id y el email, el password se encarga Firebase Authr
                const newUser = {
                    id: user.uid,
                    email: user.email,
                }   

                // Guardar los datos del usuario en Firestore
                await addDoc(collection(dbFirebase, 'users'),{
                    ...newUser
                })
                Alert.alert('Creando usuario...', 'accediendo al sistema')
                props.navigation.navigate('Home')
            } catch (error){
                Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres')
            }
        } else{
            try{
                await signInWithEmailAndPassword(auth, email, password)
                Alert.alert('Iniciando...', 'accediendo al sistema')
                props.navigation.navigate('Home')
            } catch (error){
                Alert.alert('Error', 'no pudo logearse')
            }
        }
    }    
    return (
        <View>
            <View>
                <Text>Este es la pantalla 2 - Logeo y Register y register</Text>
            </View>
            <View>
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
                    <Text>{registering ? "Regístrate" : "Inicia sesión"}</Text>
                </Pressable>
            </View>
            <View>
                <Text>{registering ? "Si ya tienes una cuenta" : "No tienes una cuenta?"}</Text>
                <Pressable onPress={() => setRegistering(!registering)}>
                    <Text>{registering ? "Inicia sesión" : "Regístrate"}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      width: 200,
      height: 50,
      borderWidth: 1,
      borderColor: "black",
    },
});