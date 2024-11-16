// app/components/QuickStartMenu/index.tsx
import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const menuItems = [
  { id: 1, label: 'My Courses', icon: 'library-books' },
  { id: 2, label: 'Recommendations', icon: 'recommend' },
  { id: 3, label: 'Course Plan', icon: 'schedule' },
  { id: 4, label: 'Resources', icon: 'folder' },
  { id: 5, label: 'Track Progress', icon: 'trending-up' },
];

const QuickStartMenu = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Quick Start</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {menuItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.menuItem}>
          <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={24} color="#333" />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default QuickStartMenu;