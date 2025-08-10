import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigation from './navigation/MainNavigation'
import * as NavigationBar from 'expo-navigation-bar'
import { AuthProvider } from './context/AuthContext'  // Importamos el AuthProvider

export default function App() {    
    // Cambio en color de la barra de navegación (Solo funciona en Android)
    NavigationBar.setBackgroundColorAsync('#f5f5f5') 
    NavigationBar.setButtonStyleAsync('dark') 
    
    // Contiene una área segura del contenido, la navegación de pantallas y tabs
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <MainNavigation/>
                </NavigationContainer>
            </SafeAreaProvider>
        </AuthProvider>
    )
}