import React, { useEffect, useRef } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigation/types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  FadeIn
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Import components
import Header from '../../components/Header';
import ProgressCard from '../../components/ProgressCard';
import QuickStartMenu from '../../components/QuickStartMenu';
import RecommendationsComponent from '../../components/RecomendationCourse';
import TechRecommendation from '../../components/Tech_Recommendation';
import UpcomingTasks from '../../components/UpcomingTasks';
import CourseInsights from '../../components/CourseInsights';
import FooterNavBar from '../../components/FooterNavBar';
import { AnimatedWrapper } from '../../components/AnimatedWrapper/AnimatedWrapper';

import styles from './styles';

interface DashboardProps {
  username?: string;
  modules?: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  username = "Student",
  modules = [] 
}) => {
  const navigation = useNavigation<NavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate the dashboard into view
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  // Animation style for the entire dashboard
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    // Simulate refresh operation
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleRecommendationsPress = () => {
    // Use consistent navigation pattern with Expo Router
    navigation.navigate('screens/Recommendations/index', { modules });
  };

  // Scroll to a specific component
  const scrollToComponent = (yOffset: number) => {
    scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.headerContainer}>
        <Header />
        
        {/* Welcome section with navigation controls */}
        <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.usernameText}>{username}</Text>
          </View>
          
          <View style={styles.quickNav}>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => scrollToComponent(300)}
            >
              <Ionicons name="school-outline" size={22} color="#4A6FA5" />
              <Text style={styles.navButtonText}>Learning</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => scrollToComponent(700)}
            >
              <Ionicons name="trending-up-outline" size={22} color="#4A6FA5" />
              <Text style={styles.navButtonText}>Progress</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigation.navigate('screens/chat/index')}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={22} color="#4A6FA5" />
              <Text style={styles.navButtonText}>Ask AI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A6FA5']}
            tintColor="#4A6FA5"
          />
        }
      >
        <Animated.View style={[styles.contentContainer, animatedStyle]}>
          <AnimatedWrapper delay={100}>
            <ProgressCard />
          </AnimatedWrapper>

          <AnimatedWrapper delay={200}>
            <QuickStartMenu />
          </AnimatedWrapper>

          <AnimatedWrapper delay={300}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended For You</Text>
              <TouchableOpacity onPress={handleRecommendationsPress}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <RecommendationsComponent 
              modules={modules} 
              showHeader={false}
              displayMode="carousel" 
            />
          </AnimatedWrapper>

          <AnimatedWrapper delay={400}>
            <UpcomingTasks />
          </AnimatedWrapper>

          <AnimatedWrapper delay={450}>
            <TechRecommendation />
          </AnimatedWrapper>

          <AnimatedWrapper delay={500}>
            <CourseInsights />
          </AnimatedWrapper>

          {/* Add spacing at the bottom for the footer */}
          <View style={styles.footerSpace} />
        </Animated.View>
      </ScrollView>
      
      <FooterNavBar />
    </SafeAreaView>
  );
};

export default Dashboard;
