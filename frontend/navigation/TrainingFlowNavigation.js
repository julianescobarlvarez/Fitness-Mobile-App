import { createStackNavigator } from '@react-navigation/stack'
//import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text } from 'react-native'

import PreWarnUpScreen from '../screens/training-flow-screens/PreWarmUpScreen'
import ExercisePerformanceScreen from '../screens/training-flow-screens/ExercisePerformanceScreen'
import ExercisePerformance2Screen from '../screens/training-flow-screens/ExercisePerformance2Screen'
import RoutineSummaryScreen from '../screens/training-flow-screens/RoutineSummaryScreen'

const Stack = createStackNavigator()

const TrainingFlowNavigation = (props) => (
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
            name="preWarnUp"
            component={PreWarnUpScreen}
        />
        <Stack.Screen
            name="exercisePerformance"
            component={ExercisePerformanceScreen}
        />
        <Stack.Screen
            name="exercisePerformance2"
            component={ExercisePerformance2Screen}
        />
        <Stack.Screen
            name="routineSummary"
            component={RoutineSummaryScreen}
        />
    </Stack.Navigator>

)

export default TrainingFlowNavigation