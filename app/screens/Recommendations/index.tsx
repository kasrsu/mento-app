import React from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import styles from './styles';

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

const CourseCard = ({ name, description }: Omit<Module, 'id'>) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{name}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default function RecommendationsScreen() {
  const route = useRoute<RecommendationsScreenRouteProp>();
  const { modules } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Recommended Courses</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard name={item.name} description={item.description} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}