import { createStackNavigator } from '@react-navigation/stack'

import NameScreen from '../screens/register-screens/NameScreen'
import GenderScreen from '../screens/register-screens/GenderScreen'
import RegisterService from '../repository/RegisterService'

const Stack = createStackNavigator()

export default function RegisterUserNavigation(){

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="name"
                component={NameScreen}
            />
            <Stack.Screen
                name="gender"
                component={GenderScreen}
            />
            <Stack.Screen
                name="registerService"
                component={RegisterService}
            />
        </Stack.Navigator>
    )
}