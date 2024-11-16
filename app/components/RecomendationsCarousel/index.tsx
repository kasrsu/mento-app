// app/components/RecommendationsCarousel/index.tsx
import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';

const recommendations = [
  { id: 1, title: 'Data Science Basics', description: 'Learn fundamental concepts of data analysis and visualization' },
  { id: 2, title: 'Python Programming', description: 'Master Python programming with hands-on exercises' },
  { id: 3, title: 'Machine Learning', description: 'Explore ML algorithms and practical applications' },
];

const RecommendationsCarousel = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Today's Recommendations</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {recommendations.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Start Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </View>
);

export default RecommendationsCarousel;