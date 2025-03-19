import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResourceList from '../../../components/ModuleInterface/ResorceList';
import styles from '../styles';

interface ResourceSectionProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ResourceSection: React.FC<ResourceSectionProps> = ({ isExpanded, onToggleExpand }) => {
  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity 
        style={[styles.sectionHeader, isExpanded && styles.activeSection]}
        onPress={onToggleExpand}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons name="document-text-outline" size={22} color="#4A6FA5" />
          <Text style={styles.sectionTitle}>Learning Resources</Text>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={22} 
          color="#4A6FA5" 
        />
      </TouchableOpacity>
      
      {isExpanded && <ResourceList />}
    </View>
  );
};

export default ResourceSection;
