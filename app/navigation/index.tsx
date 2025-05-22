import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Import your screens
import HomeScreen from '../screens/home';
import RecommendationsScreen from '../screens/Recommendations';
import ChatScreen from '../screens/Chat';
import ModuleContent from '../screens/ModuleContent';
import DashboardScreen from '../screens/Dashboard';
import ProgressScreen from '../screens/progress';


const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {/* Main routes */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ModuleContent" component={ModuleContent} />
        
        {/* Path-style routes */}
        <Stack.Screen name="screens/home/index" component={HomeScreen} />
        <Stack.Screen name="screens/Dashboard/index" component={DashboardScreen} />
        <Stack.Screen name="screens/Recommendations/index" component={RecommendationsScreen} />
        <Stack.Screen name="screens/chat/index" component={ChatScreen} />
        <Stack.Screen name="screens/ModuleContent/index" component={ModuleContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
