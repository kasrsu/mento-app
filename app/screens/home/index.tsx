import React, { useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, View, TouchableWithoutFeedback, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Header from '../../components/Header';
import ProgressCard from '../../components/ProgressCard';
import QuickStartMenu from '../../components/QuickStartMenu';
import RecommendationsCarousel from '../../components/RecomendationCourse';
import UpcomingTasks from '../../components/UpcomingTasks';
import CourseInsights from '../../components/CourseInsights';
import FooterNavBar from '../../components/FooterNavBar';
import TechRecommendation from '../../components/Tech_Recommendation';  
import styles from './styles';

export default function HomeScreen() {
  const opacity = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isInTechRecommendationArea = useSharedValue(false);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    // You may need to adjust these values based on your layout
    const techRecommendationStart = 500; 
    const techRecommendationEnd = 1000;
    
    // Check if we're in the tech recommendation area
    if (y >= techRecommendationStart && y <= techRecommendationEnd) {
      isInTechRecommendationArea.value = true;
    } else {
      isInTechRecommendationArea.value = false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        nestedScrollEnabled={false}
      >
        <Animated.View style={animatedStyle}>
          <Header />
          <ProgressCard />
          <QuickStartMenu />
          <RecommendationsCarousel modules={[]} />
          
          {/* Wrap TechRecommendation in a View with onStartShouldSetResponder */}
          <View
            onStartShouldSetResponder={() => true}
            onResponderTerminationRequest={() => false}
          >
            <TechRecommendation />
          </View>
          
          <UpcomingTasks />
          <CourseInsights />
        </Animated.View>
      </ScrollView>
      <FooterNavBar />
    </SafeAreaView>
  );
}