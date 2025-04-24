import { StatusBar } from 'expo-status-bar';
import Home from './home'
import Stats from './stats'
import Game from './game'
import Setup from './setup'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Game' component={Game} />
        <Stack.Screen name='Stats' component={Stats} />
        <Stack.Screen name='Setup' component={Setup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

