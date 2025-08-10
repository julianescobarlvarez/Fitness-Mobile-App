import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import validateEmailService from '../../services/validateEmailService'
import loginService from '../../services/loginService'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Pantalla para el logueo o registro de usuario
export default function AuthScreen(props) {
    const [registering, setRegistering] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setIsAuthenticated } = useAuth()
    
    // Para hacer una auntenticación asincronica al loguear o registrarse
    const authentication = async() => {
        // Se activa si el usuario se esta registrando
        if(registering){  
            try{
                // Se crea el objeto email
                const emailData = {
                    email: email
                }
                
                // Se envía una consulta al servicio para validar el email entrante
                const response = await validateEmailService(emailData)
                console.log(response.data)

                // Se navega a la pantalla siguiente para seguir el registro
                props.navigation.navigate('userRegister', {
                    screen: 'name',
                    params: {
                        email: email,
                        password: password
                    }
                })

            } catch (error){
                // Verifica el tipo de error para mostrar el mensaje correspondiente
                Alert.alert('Credenciales inválidas', 'Revisa tus credenciales y reinténtalo')
            }
        // Se activa si el usuario está iniciando sesión
        } else{
            try{
                // Se crea el objeto usuario con el email y contraseña
                const userLogin = {
                    email: email,
                    password: password
                }

                // Se envía una consulta al servicio para hacer el inicio de sesión
                const data = await loginService(userLogin)
                
                // Si el inicio de sesión es exitoso, el servidor devolverá un token
                const token  = data.data.token
                console.log('Token JWT:', token)

                // Se usa el servicio de AsyncStorage para guardar el token de autenticación
                await AsyncStorage.setItem('authToken', token)
                console.log('Se ha llamado al servicio de AsyncStorage con éxito')
                
                //Se usa el servicio de AsyncStorage para guarda el email del usuario
                await AsyncStorage.setItem('emailToken', email)
                console.log('Se ha llamado al servicio de AsyncStorage con éxito')
                
                setIsAuthenticated(true)

            } catch (error){
                Alert.alert('Credenciales inválidas', 'No se encuentra esta cuenta en el sistema')
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