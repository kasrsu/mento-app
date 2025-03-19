
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

interface ModuleProgressProps {
  progressPercentage: number;
}

const ModuleProgress: React.FC<ModuleProgressProps> = ({ progressPercentage }) => {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>{progressPercentage}% Complete</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>
    </View>
  );
};

export default ModuleProgress;