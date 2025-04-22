import { StatusBar } from 'expo-status-bar';
import home from './home'
import stats from './stats'
import game from './game'
import setup from './setup'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={home} />
        <Stack.Screen name='game' component={game} />
        <Stack.Screen name='stats' component={stats} />
        <Stack.Screen name='setup' component={setup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

