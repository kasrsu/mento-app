import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

interface ModuleHeaderProps {
  moduleName: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ moduleName }) => {
  const navigation = useNavigation();
  
  // Add console log to verify the received props
  console.log("ModuleHeader received props:", { moduleName });

  return (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.moduleNameBadge}>{moduleName}</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModuleHeader;
