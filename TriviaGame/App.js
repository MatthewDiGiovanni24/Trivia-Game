import { StatusBar } from 'expo-status-bar';
import home from './home'
import stats from './stats'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

