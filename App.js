import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import NewFormScreen from './src/screens/NewFormScreen';
import SavedFormsScreen from './src/screens/SavedFormsScreen';
import FormDetailScreen from './src/screens/FormDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'AI Forester' }}
        />
        <Stack.Screen 
          name="NewForm" 
          component={NewFormScreen} 
          options={{ title: 'New Observation' }}
        />
        <Stack.Screen 
          name="SavedForms" 
          component={SavedFormsScreen} 
          options={{ title: 'Saved Observations' }}
        />
        <Stack.Screen 
          name="FormDetail" 
          component={FormDetailScreen} 
          options={{ title: 'Observation Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}