// app/components/CourseInsights/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const insights = [
  { id: 1, title: 'New trends in Data Science', description: 'Stay updated with the latest trends in Data Science.' },
  { id: 2, title: 'Top skills to focus on this week', description: 'Enhance your skills with these top focus areas.' },
];

const CourseInsights = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Personalized Course Insights</Text>
    {insights.map((insight) => (
      <View key={insight.id} style={styles.insightItem}>
        <Text style={styles.insightTitle}>{insight.title}</Text>
        <Text style={styles.insightDescription}>{insight.description}</Text>
      </View>
    ))}
    <TouchableOpacity style={styles.exploreButton}>
      <Text style={styles.buttonText}>Explore More</Text>
    </TouchableOpacity>
  </View>
);

export default CourseInsights;