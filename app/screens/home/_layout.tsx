// app/screens/home/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import ProgressCard from '../../components/ProgressCard';
import QuickStartMenu from '../../components/QuickStartMenu';
import RecommendationsCarousel from '../../components/RecomendationCourse';
import UpcomingTasks from '../../components/UpcomingTasks';
import styles from './styles';
import CourseInsights from '../../components/CourseInsights';
import FooterNavBar from '../../components/FooterNavBar';
import {AnimatedWrapper} from '../../components/AnimatedWrapper/AnimatedWrapper';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)}>
        <Header />
      </Animated.View>
      
      <ScrollView style={styles.scrollContent}>
        <AnimatedWrapper delay={100}>
          <ProgressCard />
        </AnimatedWrapper>

        <AnimatedWrapper delay={200}>
          <QuickStartMenu />
        </AnimatedWrapper>

        <AnimatedWrapper delay={300}>
          <RecommendationsCarousel modules={[]} />
        </AnimatedWrapper>

        <AnimatedWrapper delay={400}>
          <UpcomingTasks />
        </AnimatedWrapper>

        <AnimatedWrapper delay={500}>
          <CourseInsights />
        </AnimatedWrapper>
      </ScrollView>
      
      <AnimatedWrapper delay={600}>
        <FooterNavBar />
      </AnimatedWrapper>
    </SafeAreaView>
  );
}