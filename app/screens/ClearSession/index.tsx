import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from '../../../SessionContext';
import styles from './styles';

const ClearSession: React.FC = () => {
  const [isClearing, setIsClearing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigation = useNavigation();
  const { clearCache } = useSession();

  useEffect(() => {
    const clearAllData = async () => {
      try {
        await clearCache();
        await AsyncStorage.clear();
        setIsSuccess(true);
        setIsClearing(false);
        
        // Navigate to login screen after 2 seconds
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }, 2000);

      } catch (error) {
        console.error('Failed to clear data:', error);
        setIsClearing(false);
      }
    };

    clearAllData();
  }, []);

  return (
    <View style={styles.container}>
      {isClearing ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>Clearing session data...</Text>
        </>
      ) : (
        <Text style={styles.successText}>
          {isSuccess ? 'Session cleared successfully!' : 'Failed to clear session.'}
        </Text>
      )}
    </View>
  );
};

export default ClearSession;
