import { createStackNavigator } from '@react-navigation/stack'

import NameScreen from '../screens/register-screens/NameScreen'
import GenderScreen from '../screens/register-screens/GenderScreen'
import RegisterService from '../repository/RegisterService'

const Stack = createStackNavigator()

export default function RegisterUserNavigation(props){
    const { email, password } = props.route.params
    
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="name"
                component={NameScreen}
                initialParams={{ email, password }}
            />
            <Stack.Screen
                name="gender"
                component={GenderScreen}
                initialParams={{ email, password }}
            />
            <Stack.Screen
                name="registerService"
                component={RegisterService}
                initialParams={{ email, password }}
            />
        </Stack.Navigator>
    )

}