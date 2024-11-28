import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './app/screens/WelcomeScreen'
//import CreateNote from './screens/CreateNote'
import HomeScreen from './app/screens/HomeScreen'
import AuthScreen from './app/screens/AuthScreen'

export default function App() {
  
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title:"La Home Page",
            headerTitleAlign:"center",
            headerStyle:{backgroundColor: "#881874"},
            headerTintColor:"white",
            animationEnabled: false,
            cardStyleInterpolator: ({}) => {
              return {
                cardStyle: {
                  opacity: 1,
                },
              };
            },
          }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            title:"Registro y Login",
            headerTitleAlign:"center",
            headerStyle:{backgroundColor: "#881874"},
            headerTintColor:"white",
            animationEnabled: false,
            cardStyleInterpolator: ({}) => {
              return {
                cardStyle: {
                  opacity: 1,
                },
              };
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title:"Pantalla principal",
            headerTitleAlign:"center",
            headerStyle:{backgroundColor: "#881874"},
            headerTintColor:"white",
            animationEnabled: false,
            cardStyleInterpolator: ({}) => {
              return {
                cardStyle: {
                  opacity: 1,
                },
              };
            },
          }}
        />
      </Stack.Navigator>
    );
  }
  
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}
