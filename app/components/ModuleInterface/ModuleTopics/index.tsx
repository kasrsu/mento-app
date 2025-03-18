// ModuleTopics.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Topic, { TopicProps } from '../TopicList';

interface ModuleTopicsProps {
  topics: Omit<TopicProps, 'onPress'>[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onTopicPress: (topicId: string) => void;
}

const ModuleTopics: React.FC<ModuleTopicsProps> = ({
  topics,
  isExpanded,
  onToggleExpand,
  onTopicPress,
}) => (
  <View style={styles.container}>
    {/* Header */}
    <TouchableOpacity 
      style={[styles.header, isExpanded && styles.activeHeader]}
      onPress={onToggleExpand}
    >
      <View style={styles.headerTitle}>
        <Ionicons name="list-outline" size={22} color="#4A6FA5" />
        <Text style={styles.headerText}>Module Topics</Text>
      </View>
      <Ionicons 
        name={isExpanded ? "chevron-up" : "chevron-down"}
        size={22} 
        color="#4A6FA5" 
      />
    </TouchableOpacity>
    
    {/* Topics List */}
    {isExpanded && (
      <View style={styles.content}>
        {topics.map(topic => (
          <Topic 
            key={topic.id}
            {...topic}
            onPress={() => onTopicPress(topic.id)}
          />
        ))}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
  },
  activeHeader: {
    borderLeftWidth: 4,
    borderLeftColor: '#3A86FF',
    backgroundColor: '#F0F7FF',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 10,
  },
  content: {
    padding: 8,
  }
});

export default ModuleTopics;
