import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  RefreshControl,
  Dimensions,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigation/types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  FadeIn
} from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import components
import Header from '../../components/Header';
import FooterNavBar from '../../components/FooterNavBar';
import { AnimatedWrapper } from '../../components/AnimatedWrapper/AnimatedWrapper';

// Create separate styles for the Dashboard screen
import styles from './styles';

// Interface for module data
interface Module {
  id: string;
  name: string;
  description: string;
  progress?: number;
  timeSpent?: number;
  lastAccess?: string;
  isCompleted?: boolean;
  topics?: Array<{
    id: string;
    title: string;
    isCompleted: boolean;
  }>;
}

// Weekly study time data
const weeklyStudyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [2.5, 1.8, 3.2, 2.0, 1.5, 4.0, 3.0], // hours per day
      color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
      strokeWidth: 2
    }
  ]
};

// Performance metrics by topic
const topicPerformanceData = {
  labels: ['Algorithms', 'UI Design', 'Database', 'Testing', 'DevOps'],
  datasets: [
    {
      data: [85, 70, 65, 90, 60] // Percentage scores
    }
  ]
};

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const screenWidth = Dimensions.get('window').width;
  const opacity = useSharedValue(0);
  
  // State for module data
  const [allModules, setAllModules] = useState<Module[]>([]);
  const [completedModules, setCompletedModules] = useState<Module[]>([]);
  const [inProgressModules, setInProgressModules] = useState<Module[]>([]);
  const [notStartedModules, setNotStartedModules] = useState<Module[]>([]);
  const [completionData, setCompletionData] = useState([
    {
      name: 'Completed',
      population: 0,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'In Progress',
      population: 0,
      color: '#FFC107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: 'Not Started',
      population: 0,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }
  ]);
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    fetchModuleData();
  }, []);

  const fetchModuleData = async () => {
    try {
      setRefreshing(true);
      
      // Try to get module data from AsyncStorage
      const storedModulesJson = await AsyncStorage.getItem('recommendedModules');
      const progressDataJson = await AsyncStorage.getItem('moduleProgress');
      
      // Default fallback modules if none in storage
      let modules: Module[] = [
        { id: '1', name: 'Introduction to Programming', description: 'Learn the basics of programming concepts' },
        { id: '2', name: 'Data Structures', description: 'Master essential data structures for efficient programming' },
        { id: '3', name: 'Web Development Basics', description: 'Introduction to HTML, CSS, and JavaScript' },
        { id: '4', name: 'Mobile App Development', description: 'Build cross-platform mobile applications' },
        { id: '5', name: 'Cloud Computing', description: 'Introduction to cloud services and deployment' },
      ];
      
      // Load modules from storage if available
      if (storedModulesJson) {
        const storedModules = JSON.parse(storedModulesJson);
        if (Array.isArray(storedModules) && storedModules.length > 0) {
          modules = storedModules;
        }
      }
      
      // Load progress data if available
      let progressData = {};
      if (progressDataJson) {
        progressData = JSON.parse(progressDataJson) || {};
      }
      
      // Enhance modules with progress data
      const enhancedModules = modules.map(module => {
        const moduleProgress = progressData[module.id] || {
          progress: 0,
          isCompleted: false,
          timeSpent: Math.floor(Math.random() * 300),
          lastAccess: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };
        
        return {
          ...module,
          progress: moduleProgress.progress || 0,
          isCompleted: moduleProgress.isCompleted || false,
          timeSpent: moduleProgress.timeSpent || 0,
          lastAccess: moduleProgress.lastAccess || 'Never'
        };
      });
      
      // Set all modules
      setAllModules(enhancedModules);
      
      // Categorize modules
      const completed = enhancedModules.filter(m => m.isCompleted);
      const inProgress = enhancedModules.filter(m => m.progress > 0 && !m.isCompleted);
      const notStarted = enhancedModules.filter(m => m.progress === 0 && !m.isCompleted);
      
      setCompletedModules(completed);
      setInProgressModules(inProgress);
      setNotStartedModules(notStarted);
      
      // Update pie chart data
      setCompletionData([
        {
          name: 'Completed',
          population: completed.length,
          color: '#4CAF50',
          legendFontColor: '#7F7F7F',
          legendFontSize: 12
        },
        {
          name: 'In Progress',
          population: inProgress.length,
          color: '#FFC107',
          legendFontColor: '#7F7F7F',
          legendFontSize: 12
        },
        {
          name: 'Not Started',
          population: notStarted.length,
          color: '#F44336',
          legendFontColor: '#7F7F7F',
          legendFontSize: 12
        }
      ]);
      
      // Calculate overall progress
      if (enhancedModules.length > 0) {
        const totalProgress = enhancedModules.reduce((sum, module) => sum + (module.progress || 0), 0);
        const avgProgress = totalProgress / enhancedModules.length;
        setOverallProgress(avgProgress);
      }
      
      // Calculate total study time
      const totalTime = enhancedModules.reduce((sum, module) => sum + (module.timeSpent || 0), 0);
      setTotalStudyTime(totalTime);
      
    } catch (error) {
      console.error('Error fetching module data:', error);
      Alert.alert('Error', 'Could not load dashboard data. Please try again later.');
    } finally {
      setRefreshing(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onRefresh = React.useCallback(() => {
    fetchModuleData();
  }, []);

  const navigateToModuleContent = (moduleId: string) => {
    const module = allModules.find(m => m.id === moduleId);
    if (module) {
      navigation.navigate('screens/ModuleContent/index', {
        moduleId: module.id,
        moduleName: module.name,
        moduleDescription: module.description
      });
    }
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#4A90E2'
    }
  };

  // Format minutes into hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Summary Cards */}
      <View style={styles.summaryCardsContainer}>
        <View style={styles.summaryCard}>
          <Ionicons name="book" size={24} color="#4A90E2" />
          <Text style={styles.summaryCardValue}>{allModules.length}</Text>
          <Text style={styles.summaryCardLabel}>Total Modules</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          <Text style={styles.summaryCardValue}>{completedModules.length}</Text>
          <Text style={styles.summaryCardLabel}>Completed</Text>
        </View>
        <View style={styles.summaryCard}>
          <Ionicons name="time" size={24} color="#FFC107" />
          <Text style={styles.summaryCardValue}>{formatTime(totalStudyTime)}</Text>
          <Text style={styles.summaryCardLabel}>Study Time</Text>
        </View>
      </View>

      {/* Overall Progress */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={overallProgress} 
            color="#4A90E2" 
            style={styles.progressBar} 
          />
          <View style={styles.progressLabels}>
            <Text style={styles.progressPercentage}>{Math.round(overallProgress * 100)}%</Text>
            <Text style={styles.progressText}>Learning Journey</Text>
          </View>
        </View>
      </View>

      {/* Completion Status Chart */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Module Completion</Text>
        {completionData.some(item => item.population > 0) ? (
          <PieChart
            data={completionData}
            width={screenWidth - 40}
            height={180}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute
          />
        ) : (
          <View style={styles.emptyChartContainer}>
            <Text style={styles.emptyChartText}>No module data available</Text>
          </View>
        )}
      </View>

      {/* Weekly Study Time Chart */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Weekly Study Time</Text>
        <LineChart
          data={weeklyStudyData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </View>
  );

  const renderInsightsTab = () => (
    <View style={styles.tabContent}>
      {/* Performance by Topic */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Performance by Topic</Text>
        <BarChart
          data={topicPerformanceData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.7,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          fromZero
          showValuesOnTopOfBars
        />
      </View>

      {/* Learning Patterns */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Learning Patterns</Text>
        <View style={styles.insightItem}>
          <Ionicons name="time-outline" size={22} color="#4A90E2" />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Peak Study Time</Text>
            <Text style={styles.insightValue}>Evenings (7 PM - 9 PM)</Text>
          </View>
        </View>
        <View style={styles.insightItem}>
          <Ionicons name="calendar-outline" size={22} color="#4A90E2" />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Most Active Days</Text>
            <Text style={styles.insightValue}>Wednesday, Saturday</Text>
          </View>
        </View>
        <View style={styles.insightItem}>
          <Ionicons name="speedometer-outline" size={22} color="#4A90E2" />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Average Session Length</Text>
            <Text style={styles.insightValue}>
              {allModules.length > 0 ? `${Math.round(totalStudyTime / allModules.length)} minutes` : 'No data'}
            </Text>
          </View>
        </View>
      </View>

      {/* Module Completion Rate */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Completion Rate</Text>
        <View style={styles.insightItem}>
          <Ionicons name="trending-up-outline" size={22} color="#4CAF50" />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Module Completion Rate</Text>
            <Text style={styles.insightValue}>
              {allModules.length > 0 
                ? `${Math.round((completedModules.length / allModules.length) * 100)}%` 
                : '0%'}
            </Text>
          </View>
        </View>
      </View>

      {/* Improvement Areas - based on modules with lowest progress */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Areas for Improvement</Text>
        <View style={styles.improvementContainer}>
          {inProgressModules.concat(notStartedModules)
            .sort((a, b) => (a.progress || 0) - (b.progress || 0))
            .slice(0, 3)
            .map((module, index) => (
              <View key={module.id} style={styles.improvementItem}>
                <View style={[styles.improvementIconContainer, { 
                  backgroundColor: index === 0 ? '#FFE0E0' : 
                                   index === 1 ? '#FFF5E0' : '#E0F7FF' 
                }]}>
                  <FontAwesome5 
                    name={index === 0 ? "book" : index === 1 ? "code" : "graduation-cap"} 
                    size={16} 
                    color={index === 0 ? "#F44336" : index === 1 ? "#FFC107" : "#4A90E2"} 
                  />
                </View>
                <Text style={styles.improvementText}>{module.name}</Text>
              </View>
            ))}
          {inProgressModules.length === 0 && notStartedModules.length === 0 && (
            <Text style={styles.emptyStateText}>No improvement areas identified yet</Text>
          )}
        </View>
      </View>
    </View>
  );

  const renderModulesTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Your Modules</Text>
      
      {/* Modules List with Progress */}
      {allModules.length > 0 ? (
        allModules.map(module => (
          <TouchableOpacity 
            key={module.id}
            style={styles.moduleItem}
            onPress={() => navigateToModuleContent(module.id)}
          >
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleName}>{module.name}</Text>
              <Text style={styles.modulePercentage}>
                {Math.round((module.progress || 0) * 100)}%
              </Text>
            </View>
            
            <ProgressBar 
              progress={module.progress || 0} 
              color="#4A90E2" 
              style={styles.moduleProgress} 
            />
            
            <View style={styles.moduleFooter}>
              <View style={styles.moduleMetaItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.moduleMetaText}>
                  {module.timeSpent ? formatTime(module.timeSpent) : 'No time data'}
                </Text>
              </View>
              <View style={styles.moduleMetaItem}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.moduleMetaText}>
                  Last: {module.lastAccess || 'Never'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.continueButton,
                module.isCompleted ? styles.reviewButton : {}
              ]}
              onPress={() => navigateToModuleContent(module.id)}
            >
              <Text style={styles.continueButtonText}>
                {module.isCompleted ? "Review" : module.progress && module.progress > 0 ? "Continue" : "Start"}
              </Text>
              <Ionicons 
                name={module.isCompleted ? "refresh" : "arrow-forward"} 
                size={16} 
                color="#FFF" 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="book-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateTitle}>No Modules Yet</Text>
          <Text style={styles.emptyStateText}>Get started by finding new modules to learn</Text>
        </View>
      )}
      
      {/* Action Button */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => navigation.navigate('screens/Recommendations/index')}
      >
        <Text style={styles.actionButtonText}>Find More Modules</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.headerContainer}>
        <Header />
        
        {/* Dashboard Title */}
        <View style={styles.dashboardTitleContainer}>
          <View>
            <Text style={styles.dashboardSubtitle}>Your Learning</Text>
            <Text style={styles.dashboardTitle}>Analytics Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Ionicons name="refresh" size={22} color="#4A90E2" />
          </TouchableOpacity>
        </View>
        
        {/* Tab Navigation */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'overview' ? styles.activeTab : {}]}
            onPress={() => setActiveTab('overview')}
          >
            <Ionicons 
              name="pie-chart" 
              size={18} 
              color={activeTab === 'overview' ? "#4A90E2" : "#666"} 
            />
            <Text style={[styles.tabText, activeTab === 'overview' ? styles.activeTabText : {}]}>
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'insights' ? styles.activeTab : {}]}
            onPress={() => setActiveTab('insights')}
          >
            <Ionicons 
              name="bulb" 
              size={18} 
              color={activeTab === 'insights' ? "#4A90E2" : "#666"} 
            />
            <Text style={[styles.tabText, activeTab === 'insights' ? styles.activeTabText : {}]}>
              Insights
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'modules' ? styles.activeTab : {}]}
            onPress={() => setActiveTab('modules')}
          >
            <Ionicons 
              name="library" 
              size={18} 
              color={activeTab === 'modules' ? "#4A90E2" : "#666"} 
            />
            <Text style={[styles.tabText, activeTab === 'modules' ? styles.activeTabText : {}]}>
              Modules
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
      >
        <Animated.View style={[styles.contentContainer, animatedStyle]}>
          {/* Render tab content based on active tab */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'insights' && renderInsightsTab()}
          {activeTab === 'modules' && renderModulesTab()}
          
          {/* Add spacing at the bottom for the footer */}
          <View style={styles.footerSpace} />
        </Animated.View>
      </ScrollView>
      
      <FooterNavBar />
    </SafeAreaView>
  );
}
