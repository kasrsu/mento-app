// app/screens/home/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import ProgressCard from '../../components/ProgressCard';
import QuickStartMenu from '../../components/QuickStartMenu';
import styles from './styles';
import RecommendationsCarousel from '../../components/RecomendationsCarousel';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <ProgressCard />
        <QuickStartMenu />
        <RecommendationsCarousel />
      </ScrollView>
    </SafeAreaView>
  );
}