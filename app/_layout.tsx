// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SessionProvider } from '../SessionContext';

export default function RootLayout() {
  return (
    <>
    <SessionProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f5f5f5' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="screens/home/index" 
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen 
          name="screens/Dashboard/index" 
          options={{
            title: 'Dashboard',
          }}
        />
        <Stack.Screen 
          name="screens/Recommendations/index" 
          options={{
            title: 'Recommendations',
          }}
        />
        <Stack.Screen 
          name="screens/chat/index" 
          options={{
            title: 'Chat',
          }}
        />
        <Stack.Screen 
          name="screens/ModuleContent/index" 
          options={{
            title: 'Module Content',
          }}
        />
      </Stack>
    </SessionProvider>
    </>
  );
}