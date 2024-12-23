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

const RecommendationsCarousel: React.FC<RecommendationsCarouselProps> = ({ modules }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleModulePress = (module: Module) => {
    navigation.navigate('screens/Mento_reco/index', { modules: [module] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Recommendations</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {modules.map((module) => (
          <View key={module.id} style={styles.card}>
            <Text style={styles.cardTitle}>{module.name}</Text>
            <Text style={styles.cardDescription}>{module.description}</Text>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleModulePress(module)}
            >
              <Text style={styles.buttonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendationsCarousel;