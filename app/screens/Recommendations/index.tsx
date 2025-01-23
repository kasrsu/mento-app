import React, { useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from './styles';

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

const CourseCard = ({ name, description }: Omit<Module, 'id'>) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{name}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default function RecommendationsScreen() {
  const route = useRoute<RecommendationsScreenRouteProp>();
  const { modules } = route.params;
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

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
          data={modules}
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