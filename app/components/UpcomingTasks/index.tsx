// app/components/ProgressCard/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import styles from './styles';

const ProgressCard = () => {
  const progress = 65; // Example progress value
  const progressAnim = useSharedValue(0);

  React.useEffect(() => {
    progressAnim.value = withSpring(progress / 100);
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressAnim.value * 100}%`,
  }));

  return (
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>Current Progress</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>
      <Text style={styles.progressText}>
        You've completed {progress}% of your current plan
      </Text>
      <TouchableOpacity style={styles.viewProgressButton}>
        <Text style={styles.buttonText}>View Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressCard;