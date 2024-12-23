import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Header from '../../components/Header';
import ProgressCard from '../../components/ProgressCard';
import QuickStartMenu from '../../components/QuickStartMenu';
import RecommendationsCarousel from '../../components/RecomendationsCarousel';
import UpcomingTasks from '../../components/UpcomingTasks';
import CourseInsights from '../../components/CourseInsights';
import FooterNavBar from '../../components/FooterNavBar';
import styles from './styles';

export default function HomeScreen() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Animated.View style={animatedStyle}>
          <Header />
          <ProgressCard />
          <QuickStartMenu />
          <RecommendationsCarousel modules={[]} />
          <UpcomingTasks />
          <CourseInsights />
        </Animated.View>
      </ScrollView>
      <FooterNavBar />
    </SafeAreaView>
  );
}