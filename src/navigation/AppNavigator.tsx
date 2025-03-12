import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GenerateVideoScreen from '../screens/GenerateVideoScreen';
import PromptTextScreen from '../screens/PromptTextScreen';
import PromptImageScreen from '../screens/PromptImageScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GenerateVideoScreen"
          component={GenerateVideoScreen}
        />
        <Stack.Screen name="PromptTextScreen" component={PromptTextScreen} />
        <Stack.Screen name="PromptImageScreen" component={PromptImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
