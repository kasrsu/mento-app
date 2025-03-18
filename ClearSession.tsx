import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearStorage: React.FC = () => {
  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage cleared successfully');
      } catch (error) {
        console.error('Failed to clear AsyncStorage:', error);
      }
    };

    clearAsyncStorage();
  }, []);

  return (
    <View>
      <Text>Clearing AsyncStorage...</Text>
    </View>
  );
};

export default ClearStorage;