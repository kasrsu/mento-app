
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressCard from '../../components/ProgressCard';

const ProgressScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      <ProgressCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProgressScreen;