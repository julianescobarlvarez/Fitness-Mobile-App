import { createStackNavigator } from '@react-navigation/stack'
//import { Ionicons } from '@expo/vector-icons'
//import { Pressable, Text } from 'react-native'

import UpperBodyScreen from '../screens/exercises-category-screens/UpperBodyScreen' 
import CoreScreen from '../screens/exercises-category-screens/CoreScreen'
import LowerBodyScreen from '../screens/exercises-category-screens/LowerBodyScreen'
import CardioScreen from '../screens/exercises-category-screens/CardioScreen'
import StretchingScreen from '../screens/exercises-category-screens/StretchingScreen'

const Stack = createStackNavigator()

const ExercisesCategoryNavigation = (props) => (
    <Stack.Navigator 
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
        }}
    >
        <Stack.Screen
            name="upperBody"
            component={UpperBodyScreen}
        />
        <Stack.Screen
            name="core"
            component={CoreScreen}
        />
        <Stack.Screen
            name="lowerBody"
            component={LowerBodyScreen}
        />
        <Stack.Screen
            name="cardio"
            component={CardioScreen}
        />
        <Stack.Screen
            name="stretchings"
            component={StretchingScreen}
        />
    </Stack.Navigator>

)

export default ExercisesCategoryNavigation