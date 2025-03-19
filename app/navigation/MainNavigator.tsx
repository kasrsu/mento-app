import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from '../screens/home/index';
import ProgressScreen from '../screens/progress/index';
import RecommendationsScreen from '../screens/Recommendations/index';
import ModuleContent from '../screens/ModuleContent/index';
import ChatScreen from '../screens/Chat/index';
import { RootStackParamList } from './types'; // Import the shared type

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: '#fff' }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="Recommendations" 
        component={RecommendationsScreen}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="ModuleContent" 
        component={ModuleContent}
        options={{
          headerShown: false,
        }} 
      />
      {/* Add path-style routes for backward compatibility */}
      <Stack.Screen 
        name="screens/home/index" 
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="screens/Recommendations/index" 
        component={RecommendationsScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="screens/chat/index" 
        component={ChatScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="screens/ModuleContent/index" 
        component={ModuleContent}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;