// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/dashboard';
import CountryDetails from './src/screens/CountryDetails';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTintColor:'#F6F1F1',headerStyle:{backgroundColor:'#146C94'}}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Country'}}/>
        <Stack.Screen name="CountryDetails" component={CountryDetails} options={{title:'Country'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;