import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Import your screens
import HomeScreen from '../screens/home';
import RecommendationsScreen from '../screens/Recommendations';
import ChatScreen from '../screens/Chat';
import ModuleContent from '../screens/ModuleContent';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="screens/home/index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens/home/index" component={HomeScreen} />
        <Stack.Screen name="screens/Recommendations/index" component={RecommendationsScreen} />
        <Stack.Screen name="screens/chat/index" component={ChatScreen} />
        <Stack.Screen name="screens/ModuleContent/index" component={ModuleContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
