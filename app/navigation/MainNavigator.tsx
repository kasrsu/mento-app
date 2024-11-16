// app/navigation/MainNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import HomeScreen from '../screens/home/index';

export type RootStackParamList = {
  Home: undefined;
};

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
          title: 'Home',
          headerShown: false,
        }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;