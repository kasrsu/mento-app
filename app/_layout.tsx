// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
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
      </Stack>
    </>
  );
}