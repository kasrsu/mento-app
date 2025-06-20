import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View, Alert, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigation/types';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import styles from './styles';
import { startModuleLearning } from '../../services/moduleApi';

interface Module {
  id: string;
  name: string;
  description: string;
}

interface RecommendationsProps {
  modules: Module[];
  showHeader?: boolean;
  displayMode?: 'carousel' | 'list';
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

const RecommendationsComponent: React.FC<RecommendationsProps> = ({ 
  modules,
  showHeader = true,
  displayMode = 'carousel'
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, [modules]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const toggleDescription = (index: number) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  const handleModulePress = async (module: Module) => {
    try {
      console.log('Module object before navigation:', module);
      
      const moduleName = module?.name || 'Unknown Module';
      const moduleId = module?.id || 'unknown';
      const moduleDescription = module?.description || '';

      console.log('Starting module learning for:', moduleName);
      
      // Start navigation first for better user experience
      navigation.navigate('screens/ModuleContent/index', {
        moduleName: moduleName,
        moduleDescription: moduleDescription,
        moduleId: moduleId
      });
      
      // Then try API call but don't wait for it
      startModuleLearning({
        moduleId,
        moduleName,
        moduleDescription
      }).catch(error => {
        // Log error but don't show to user since navigation already happened
        console.error('API error in startModuleLearning (non-blocking):', error);
      });
      
    } catch (error) {
      console.error('Error in handleModulePress:', error);
      Alert.alert(
        'Navigation Error', 
        'Could not open the module content. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Card component - used in both carousel and list views
  const renderModuleCard = (module: Module, index: number) => {
    const isExpanded = expandedCardIndex === index;
    const description = isExpanded 
      ? module.description 
      : truncateText(module.description, 100);
    
    return (
      <View key={`${module.id}-${index}`} style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{module.name}</Text>
          <Text style={styles.cardDescription} numberOfLines={isExpanded ? undefined : 3}>
            {description}
          </Text>
          {module.description.length > 100 && (
            <TouchableOpacity onPress={() => toggleDescription(index)}>
              <Text style={styles.seeMore}>
                {isExpanded ? 'See Less' : 'See More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          style={styles.startButton}
          activeOpacity={0.7}
          onPress={() => handleModulePress(module)}
        >
          <Text style={styles.startButtonText}>Start Learning</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render carousel view
  const renderCarousel = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {modules.map((module, index) => renderModuleCard(module, index))}
    </ScrollView>
  );

  // Render list view
  const renderList = () => (
    <FlatList
      data={modules}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => renderModuleCard(item, index)}
      contentContainerStyle={styles.listContainer}
    />
  );

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recommended Courses</Text>
          <Text style={styles.headerSubtitle}>Personalized for you</Text>
        </View>
      )}
      <Text style={styles.title}>Today's Recommendations</Text>
      {displayMode === 'carousel' ? renderCarousel() : renderList()}
    </Animated.View>
  );
};

export default RecommendationsComponent;