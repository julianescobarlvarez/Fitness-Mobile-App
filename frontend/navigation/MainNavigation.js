import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onAuthStateChanged } from 'firebase/auth' //cambiar
import { auth } from '../../.expo/credentials' //cambiar
import axios from 'axios'

import MainTabNavigation from './MainTabNavigation'
import FormNavigation from './FormNavigation'
import RegisterUserNavigation from './RegisterUserNavigation'
import LoadingScreen from '../screens/main-screens/LoadingScreen'
import WelcomeScreen from '../screens/main-screens/WelcomeScreen'
import AuthScreen from '../screens/main-screens/AuthScreen'
import ExercisesCategoryNavigation from './ExercisesCategoryNavigation'
import RoutinesScreen from '../screens/exercises-category-screens/exercises-subcategory-screens/RoutinesScreen'
import ExercisesListScreen from '../screens/exercises-category-screens/exercises-subcategory-screens/ExercisesListScreen'

const Stack = createStackNavigator()

function MainNavigation(){
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [loading, setLoading] = useState(true)

    //Para saber si el usuario ya se encuentra logueado
    useEffect(() => {
        // Función para verificar si el usuario está logueado
        const checkAuthStatus = async () => {
          try {
            // Obtener el token almacenado en AsyncStorage
            const token = await AsyncStorage.getItem('authToken');
            
            if (!token) {
              setIsAuthenticated(false);
              setLoading(false);
              return;
            }
    
            // Realizar la solicitud para verificar si el token es válido
            const response = await axios.get('https://localhost3000/api/auth/check', {
              headers: {
                Authorization: `Bearer ${token}`, // Enviar el token en los headers
              },
            });
    
            // Si el token es válido, actualizar el estado de autenticación
            if (response.status === 200) {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error('Error al verificar el estado de autenticación:', error);
            setIsAuthenticated(false);
          } finally {
            setLoading(false);
          }
        };
    
        checkAuthStatus();
      }, []);

    // Mientras se verifica la autenticación, se muestra una pantalla de carga
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                <Text> Cargando... </Text>
            </View>
        )
    }
    
    return(   
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f5f5f5',
                    elevation: 0, // Elimina la sombra en Android
                    shadowOpacity: 0, // Elimina la sombra en iOS
                },
            }}
        >
            {user ? (
                // Si el usuario está autenticado, mostramos las pantallas con tabs
                <>  
                    <Stack.Screen 
                        name="loading" 
                        component={LoadingScreen} 
                        options={{ 
                            headerShown: false,
                            animationEnabled: false,
                            cardStyleInterpolator: ({}) => {
                                return {
                                    cardStyle: {
                                    opacity: 1,
                                    },
                                }
                            },
                        }}
                    />
                    <Stack.Screen 
                        name="main" 
                        component={MainTabNavigation} 
                        options={{ 
                            headerShown: false,
                        }}
                    />
                </>
            ) : (
                // Si no está autenticado, mostramos las pantallas de welcome y auth
                <>
                    <Stack.Screen
                        name="welcome"
                        component={WelcomeScreen}
                        options={{
                            title:"Pantalla de bienvenida",
                            headerTitleAlign:"center",
                            headerTintColor:"black",
                            animationEnabled: false,
                            cardStyleInterpolator: ({}) => {
                                return {
                                    cardStyle: {
                                    opacity: 1,
                                    },
                                }
                            },
                        }}
                    />
                    <Stack.Screen
                        name="auth"
                        component={AuthScreen}
                        options={{
                            title:"Autenticación",
                            headerTitleAlign:"center",
                            headerTintColor:"black",
                            animationEnabled: false,
                            cardStyleInterpolator: ({}) => {
                                return {
                                    cardStyle: {
                                    opacity: 1,
                                    },
                                }
                            },
                        }}
                    />       
                    <Stack.Screen
                        name="userRegister"
                        component={RegisterUserNavigation}
                        options={{ 
                            headerShown: false,
                        }}
                    />       
                </>
            )}
            <Stack.Screen 
                name="form" 
                component={FormNavigation} 
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="exercisesCategory" 
                component={ExercisesCategoryNavigation} 
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="routines" 
                component={RoutinesScreen} 
            />
            <Stack.Screen 
                name="exercisesList" 
                component={ExercisesListScreen} 
            />
        </Stack.Navigator>
    )
}

export default MainNavigation