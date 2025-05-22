import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Dashboard from '../../components/DashBoard';
import { useSession } from '../../../SessionContext';
import styles from './styles';

export default function HomeScreen() {
  const { cachedModules } = useSession();
  const [username, setUsername] = useState("Student");
  
  // Simulate fetching user data
  useEffect(() => {
    // You could fetch the actual username from your API here
    setTimeout(() => {
      setUsername("Alex");
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Dashboard 
        username={username}
        modules={cachedModules || []}
      />
    </SafeAreaView>
  );
}