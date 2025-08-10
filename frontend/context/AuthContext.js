import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext()

// Función para detectar la autenticación del usuario como contexto global
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Se recibe un token como respuesta asíncrona desde AsyncStorage
                const token = await AsyncStorage.getItem('authToken')

                // Si el token no existe, el usuario permanece en la pantalla de bienvenida
                // Caso contrario, es enviado a la pantalla de inicio
                if (!token) {
                    setIsAuthenticated(false)
                    setLoading(false)
                } else {
                    setIsAuthenticated(true)
                    setLoading(false)
                }

            } catch (error) {
                console.error('Error al verificar el estado de autenticación:', error)
                setIsAuthenticated(false)
            }
        }
        checkAuthStatus()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Se exporta useAuth como contexto global de autenticación de usuario
export const useAuth = () => React.useContext(AuthContext)
