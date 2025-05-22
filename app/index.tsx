// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Make sure this matches the actual structure in your app
  return <Redirect href="/screens/home" />;
}