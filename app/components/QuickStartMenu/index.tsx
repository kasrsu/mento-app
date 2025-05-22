import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigation/types';
import styles from './styles';

const QuickStartMenu = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigate = (screenName: string) => {
    switch(screenName) {
      case 'My DashBoard':
        console.log("Attempting navigation to Dashboard...");
        // Use the explicit path format for Expo Router
        navigation.navigate('screens/Dashboard/index');
        break;
      case 'Recommendations':
        navigation.navigate('screens/Recommendations/index');
        break;
      case 'Course Plan':
        // Navigate to course plan when implemented
        console.log('Navigate to Course Plan - route not implemented yet');
        break;
      case 'Resources':
        // Navigate to resources when implemented
        console.log('Navigate to Resources - route not implemented yet');
        break;
      case 'Track Progress':
        navigation.navigate('screens/progress/index');
        break;
      default:
        console.log('Navigation not implemented for:', screenName);
    }
  };

  const menuItems = [
    { id: 1, label: 'My DashBoard', icon: 'dashboard' },
    { id: 2, label: 'Recommendations', icon: 'recommend' },
    { id: 3, label: 'Course Plan', icon: 'schedule' },
    { id: 4, label: 'Resources', icon: 'folder' },
    { id: 5, label: 'Track Progress', icon: 'trending-up' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Start</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => handleNavigate(item.label)}
          >
            <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={24} color="#333" />
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default QuickStartMenu;