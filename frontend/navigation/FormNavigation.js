import { createStackNavigator } from '@react-navigation/stack'
//import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text } from 'react-native'

import FitnessGoalsScreen from '../screens/form-screens/FitnessGoalsScreen'
import MuscleGoalsScreen from '../screens/form-screens/MuscleGoalsScreen'
import PhysicalLevelScreen from '../screens/form-screens/PhysicalLevelScreen'
import ActivityLevelScreen from '../screens/form-screens/ActivityLevelScreen'
import TrainingFrequencyScreen from '../screens/form-screens/TrainingFrequencyScreen'
import PlanScreen from '../screens/form-screens/PlanScreen'
import HeightScreen from '../screens/form-screens/HeightScreen'
import WeightScreen from '../screens/form-screens/WeightScreen'
import AgeScreen from '../screens/form-screens/AgeScreen'
import PlanDetailsScreen from '../screens/form-screens/PlanDetailsScreen'

const Stack = createStackNavigator()

const FormNavigation = (props) => (
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
            headerRight: () => (
                <Pressable 
                    onPress={() => {
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'main' }],
                        })
                    }} 
                    style={{ marginRight: 30, marginTop: 5 }}>
                    <Text>Volver</Text>
                </Pressable>
            ),
        }}
    >
        <Stack.Screen
            name="age"
            component={AgeScreen}
        />
        <Stack.Screen
            name="fitnessGoals"
            component={FitnessGoalsScreen}
        />
        <Stack.Screen
            name="muscleGoals"
            component={MuscleGoalsScreen}
        />
        <Stack.Screen
            name="height"
            component={HeightScreen}
        />
        <Stack.Screen
            name="weight"
            component={WeightScreen}
        />
        <Stack.Screen
            name="physicalLevel"
            component={PhysicalLevelScreen}
        />
        <Stack.Screen
            name="activityLevel"
            component={ActivityLevelScreen}
        />
        <Stack.Screen
            name="trainingFrequency"
            component={TrainingFrequencyScreen}
        />
        <Stack.Screen
            name="plan"
            component={PlanScreen}
        />
        <Stack.Screen
            name="planDetails"
            component={PlanDetailsScreen}
        />
    </Stack.Navigator>

)

export default FormNavigation