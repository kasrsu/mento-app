import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSession } from '../../../SessionContext';
import styles from './styles';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';


type Module = {
  id: string;
  name: string;
  description: string;
};

type RootStackParamList = {
  Recommendations: {
    modules: Module[];
  };
};

type RecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'Recommendations'>;


const CourseCard = ({ name, description }: Omit<Module, 'id'>) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleStartLearning = () => {
    setProgress(Math.min(1, progress + 0.1));
  };

  const truncatedDescription = description.length > 100 && !showFullDescription
    ? `${description.substring(0, 100)}...`
    : description;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardDescription}>{truncatedDescription}</Text>
      {description.length > 100 && (
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.seeMore}>
            {showFullDescription ? 'See Less' : 'See More'}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.startButton} onPress={handleStartLearning}>
        <Text style={styles.startButtonText}>Start Learning</Text>
      </TouchableOpacity>
      <ProgressBar progress={progress} color="#2196F3" style={styles.progressBar} />
    </View>
  );
};

export default function RecommendationsScreen() {
  const route = useRoute<RecommendationsScreenRouteProp>();
  const { modules = [] } = route.params || {}; // Add default empty array
  const opacity = useSharedValue(0);
  const { updateModules, cachedModules } = useSession();

  useEffect(() => {
    if (modules?.length > 0) {  // Safe optional chaining
      updateModules(modules);
    }
    opacity.value = withTiming(1, { duration: 500 });
  }, [modules]);

  // Ensure we always have an array to work with
  const displayModules = (modules?.length > 0 ? modules : cachedModules) || [];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Courses</Text>
        <Text style={styles.headerSubtitle}>Personalized for you</Text>
      </View>
      <Animated.View style={[styles.content, animatedStyle]}>
        <FlatList
          data={displayModules}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard name={item.name} description={item.description} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
