import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigation/types';
import styles from './styles';

interface Module {
  id: string;
  name: string;
  description: string;
}

interface RecommendationsCarouselProps {
  modules: Module[];
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

const RecommendationsCarousel: React.FC<RecommendationsCarouselProps> = ({ modules }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleModulePress = (module: Module) => {
    navigation.navigate('screens/Recommendations/index', { modules: [module] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Recommendations</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {modules.map((module, index) => (
          <View key={`${module.id}-${index}`} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{module.name}</Text>
              <Text style={styles.cardDescription} numberOfLines={3}>
                {truncateText(module.description, 100)}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => handleModulePress(module)}
            >
              <Text style={styles.startButtonText}>Start Learning</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendationsCarousel;