import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../context/AuthContext'

import MainTabNavigation from './MainTabNavigation'
import FormNavigation from './FormNavigation'
import RegisterUserNavigation from './RegisterUserNavigation'
import LoadingScreen from '../screens/main-screens/LoadingScreen'
import WelcomeScreen from '../screens/main-screens/WelcomeScreen'
import AuthScreen from '../screens/main-screens/AuthScreen'
import ExercisesCategoryNavigation from './ExercisesCategoryNavigation'
import RoutinesScreen from '../screens/exercises-category-screens/exercises-subcategory-screens/RoutinesScreen'
import ExercisesListScreen from '../screens/exercises-category-screens/exercises-subcategory-screens/ExercisesListScreen'
import CreatedPlansScreen from '../screens/tab-screens/home-components-screens/CreatedPlansScreen'
import PlanInfoScreen from '../screens/tab-screens/home-components-screens/PlanInfoScreen'
import DetailsRoutineScreen from '../screens/pre-routine-screens/DetailsRoutineScreen'
import TrainingFlowNavigation from './TrainingFlowNavigation'
import DetailsExerciseScreen from '../screens/pre-routine-screens/DetailsExerciseScreen'
import WarmUpScreen from '../screens/pruebas-pantallas/WarmUpScreen'
import ExercisesScreen from '../screens/pruebas-pantallas/ExercisesScreen'
import StretchingScreen from '../screens/pruebas-pantallas/StretchingScreen'
import SummaryScreen from '../screens/pruebas-pantallas/SummaryScreen'



const Stack = createStackNavigator()

function MainNavigation(){
    // Se usa el contexto para obtener el estado
    const { isAuthenticated, loading } = useAuth()

    // Mientras se verifica la autenticación, se muestra una pantalla de carga
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                <Text> Cargando.... </Text>
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
            {isAuthenticated ? (
                // Si el usuario está autenticado, se muestra las pantallas con tabs
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
                // Si no está autenticado, se muestra las pantallas de welcome y auth
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
            <Stack.Screen 
                name="createdPlans" 
                component={CreatedPlansScreen}
            />
            <Stack.Screen 
                name="planInfo" 
                component={PlanInfoScreen}
            />
            <Stack.Screen 
                name="detailsRoutine" 
                component={DetailsRoutineScreen}
            />
            <Stack.Screen 
                name="exerciseDetails" 
                component={DetailsExerciseScreen}
            />
            <Stack.Screen 
                name="trainingFlow" 
                component={TrainingFlowNavigation}
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="prueba1" 
                component={WarmUpScreen}
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="prueba2" 
                component={ExercisesScreen}
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="prueba3" 
                component={StretchingScreen}
                options={{ 
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="prueba4" 
                component={SummaryScreen}
                options={{ 
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default MainNavigation