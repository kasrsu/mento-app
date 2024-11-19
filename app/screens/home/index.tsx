// app/screens/home/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import ProgressCard from '../../components/ProgressCard';
import QuickStartMenu from '../../components/QuickStartMenu';
import RecommendationsCarousel from '../../components/RecomendationsCarousel';
import UpcomingTasks from '../../components/UpcomingTasks';
import styles from './styles';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <ProgressCard />
        <QuickStartMenu />
        <RecommendationsCarousel />
        <UpcomingTasks />
      </ScrollView>
    </SafeAreaView>
  );
}