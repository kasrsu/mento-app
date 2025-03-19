import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSession } from '../../../SessionContext';
import styles from './styles';
import RecommendationsComponent from '../../components/RecomendationCourse';

type Module = {
  id: string;
  name: string;
  description: string;
};

type RootStackParamList = {
  Recommendations: {
    modules: Module[];
  };
};

type RecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'Recommendations'>;

export default function RecommendationsScreen() {
  const route = useRoute<RecommendationsScreenRouteProp>();
  const { modules = [] } = route.params || {}; // Add default empty array
  const { updateModules, cachedModules } = useSession();

  useEffect(() => {
    if (modules?.length > 0) {
      updateModules(modules);
    }
  }, [modules]);

  // Ensure we always have an array to work with
  const displayModules = (modules?.length > 0 ? modules : cachedModules) || [];

  return (
    <SafeAreaView style={styles.container}>
      <RecommendationsComponent 
        modules={displayModules} 
        showHeader={true}
        displayMode="list"
      />
    </SafeAreaView>
  );
}
