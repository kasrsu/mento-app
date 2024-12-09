import React from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';
import styles from './styles'

type Course = {
  id: string;
  title: string;
  description: string;
};

const sampleCourses: Course[] = [
  { id: '1', title: 'Introduction to Data Science', description: 'Learn the basics of data analysis' },
  { id: '2', title: 'Advanced Python Programming', description: 'Master Python development' },
  { id: '3', title: 'Machine Learning Fundamentals', description: 'Explore ML concepts' },
  // Add more courses as needed
];

const CourseCard = ({ title, description }: Omit<Course, 'id'>) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default function RecommendationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Recommended Courses</Text>
      <FlatList
        data={sampleCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard title={item.title} description={item.description} />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}