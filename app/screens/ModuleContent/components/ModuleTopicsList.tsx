import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Define the ModuleTopic interface
interface ModuleTopic {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  subtopics: ModuleTopic[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  progress: number;
  icon: string; // Added icon for visual appeal
}

interface ModuleTopicsListProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onProgressUpdate: (percentage: number) => void;
}

const ModuleTopicsList: React.FC<ModuleTopicsListProps> = ({
  isExpanded,
  onToggleExpand,
  onProgressUpdate
}) => {
  // Sample topic data - moved from index.tsx
  // Using useState without explicit generic type
  const [topics, setTopics] = useState([
    { 
      id: '1', 
      title: 'Introduction to the Module', 
      description: "This is a description of the topic. It can be a brief overview of what the topic is about, what the learner can expect to learn, and why it's important. This is a description of the topic. It can be a brief overview of what the topic is about, what the learner can expect to learn, and why it's important.",
      isCompleted: true, 
      subtopics: [], 
      difficulty: 'beginner' as const, 
      timeEstimate: '10 mins', 
      progress: 1,
      icon: '🚀' // Added icon for visual appeal
    },
    { 
      id: '2', 
      title: 'Core Concepts', 
      description:"This is a description of the topic. It can be a brief overview of what the topic is about, what the learner can expect to learn, and why it's important. This is a description of the topic. It can be a brief overview of what the topic is about, what the learner can expect to learn, and why it's important.", 
      isCompleted: false,
      subtopics: [],
      difficulty: 'intermediate' as const,
      timeEstimate: '20 mins',
      progress: 0,
      icon: '🧠' // Added icon for visual appeal
    },
    { 
      id: '3', 
      title: 'Advanced Techniques', 
      description: "Delve deeper into complex implementations and strategies to master this subject area. This topic covers advanced concepts that build upon the fundamentals established earlier.", 
      isCompleted: false,
      subtopics: [],
      difficulty: 'advanced' as const,
      timeEstimate: '30 mins',
      progress: 0,
      icon: '⚡' // Added icon for visual appeal
    }
  ]);

  // Handler functions
  const handleTopicCompletion = (topicId: string, isCompleted: boolean) => {
    const updatedTopics = topics.map(topic => 
      topic.id === topicId 
        ? { ...topic, isCompleted: !topic.isCompleted } 
        : topic
    );
    setTopics(updatedTopics);
    
    // Calculate updated progress
    const totalTopics = updatedTopics.length;
    const completedTopics = updatedTopics.filter(topic => topic.isCompleted).length;
    const progressPercentage = Math.round((completedTopics / totalTopics) * 100);
    onProgressUpdate(progressPercentage);
  };

  // Get background colors based on difficulty
  const getDifficultyColors = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return ['#4CAF50', '#81C784'];
      case 'intermediate':
        return ['#2196F3', '#64B5F6'];
      case 'advanced':
        return ['#9C27B0', '#BA68C8'];
      default:
        return ['#78909C', '#B0BEC5'];
    }
  };

  // Render the topic item
  const renderTopicItem = ({ item }: { item: ModuleTopic }) => {
    const difficultyColors = getDifficultyColors(item.difficulty);
    
    return (
      <TouchableOpacity 
        style={styles.topicCard}
        onPress={() => handleTopicCompletion(item.id, item.isCompleted)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={item.isCompleted ? ['#E8F5E9', '#C8E6C9'] : ['#FFFFFF', '#F5F5F5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Text style={styles.topicIcon}>{item.icon}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.topicTitle} numberOfLines={1}>{item.title}</Text>
              <View style={styles.metaContainer}>
                <View style={styles.timeEstimate}>
                  <Ionicons name="time-outline" size={14} color="#757575" />
                  <Text style={styles.metaText}>{item.timeEstimate}</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[0] }]}>
                  <Text style={styles.difficultyText}>{item.difficulty}</Text>
                </View>
              </View>
            </View>
            <MaterialIcons 
              name={item.isCompleted ? "check-circle" : "radio-button-unchecked"} 
              size={24} 
              color={item.isCompleted ? "#4CAF50" : "#BDBDBD"} 
              style={styles.statusIcon}
            />
          </View>
          
          <Text style={styles.topicDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${item.progress * 100}%` }]} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <TouchableOpacity 
        style={[styles.sectionHeader, isExpanded && styles.activeSection]}
        onPress={onToggleExpand}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons name="list-outline" size={22} color="#4A6FA5" />
          <Text style={styles.sectionTitle}>Module Topics</Text>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={22} 
          color="#4A6FA5" 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <FlatList
          data={topics}
          renderItem={renderTopicItem}
          keyExtractor={(item) => item.id}
          style={styles.topicsList}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F7FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activeSection: {
    backgroundColor: '#E8F0FC',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6FA5',
  },
  topicsList: {
    padding: 12,
  },
  listContent: {
    paddingBottom: 8,
  },
  topicCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicIcon: {
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  topicDescription: {
    fontSize: 14,
    color: '#546E7A',
    lineHeight: 20,
    marginBottom: 12,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  statusIcon: {
    marginLeft: 8,
  },
});

export default ModuleTopicsList;
