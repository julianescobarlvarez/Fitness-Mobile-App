//import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'

import HomeScreen from '../screens/tab-screens/HomeScreen'
import ExercisesScreen from '../screens/tab-screens/ExercisesSreen'
import ProgressScreen from '../screens/tab-screens/ProgressScreen'
import ProfileConfigScreen from '../screens/tab-screens/ProfileConfigScreen'

const Tab = createBottomTabNavigator()

const MainTabNavigation = () => ( 
    <Tab.Navigator 
        safeAreaInsets={{ bottom: 10 }} 
        screenOptions={{
            headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#f5f5f5',
                elevation: 0, // Elimina la sombra en Android
                shadowOpacity: 0, // Elimina la sombra en iOS
            },
            tabBarStyle:{
                backgroundColor: '#f5f5f5',
            },
            tabBarLabelStyle: {
                fontSize: 13,
                fontFamily: 'Arial',
                fontWeight: 'bold',
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarButton: (props) => (
                <Pressable {...props} activeOpacity={0.9}> 
                    {props.children}
                </Pressable>
            ),
        }}
    >
        <Tab.Screen 
            name="PLAN" 
            component={HomeScreen} 
            options={{
                tabBarLabel:"Plan",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stopwatch-outline" size={size} color={color} /> // Icono para Home
                ),
                gestureEnabled: false,
            }}
        />
        <Tab.Screen 
            name="EJERCICIOS" 
            component={ExercisesScreen} 
            options={{
                tabBarLabel:"Ejercicios",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="barbell-sharp" size={size} color={color} /> // Icono para Ejercicios
                ),
                headerRight: ({color, size}) => (
                    <Ionicons
                      name="search"
                      size={25}
                      color={color}
                      style={{ marginRight: 30, marginTop: 5 }}
                    />
                ),
                gestureEnabled: false,
            }}
            />
        <Tab.Screen 
            name="PROGRESO" 
            component={ProgressScreen} 
            options={{
                tabBarLabel:"Progreso",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stats-chart" size={size} color={color}></Ionicons>// Icono para Progreso
                ),
                gestureEnabled: false,
            }}
        />
        <Tab.Screen 
            name="AJUSTES" 
            component={ProfileConfigScreen} 
            options={{
                tabBarLabel:"Ajustes",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} /> // Icono para Ajustes
                ),
                gestureEnabled: false,
            }}
        />
    </Tab.Navigator>
)

export default MainTabNavigation
