import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getModuleTopics, updateTopicCompletion, ModuleTopic } from '../../../services/moduleApi';

interface ModuleTopicsListProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onProgressUpdate: (percentage: number) => void;
  moduleId: string;
  moduleName: string;
}

const ModuleTopicsList: React.FC<ModuleTopicsListProps> = ({
  isExpanded,
  onToggleExpand,
  onProgressUpdate,
  moduleId,
  moduleName
}) => {
  const [topics, setTopics] = useState<ModuleTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Enhanced fetchTopics function with better error handling
  const fetchTopics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log(`Fetching topics for module: ${moduleName}`);
      
      const topicsData = await getModuleTopics(moduleName);
      
      console.log('Raw topics data received:', topicsData);
      
      if (Array.isArray(topicsData) && topicsData.length > 0) {
        // Format topics to ensure all required properties exist
        const formattedTopics = topicsData.map(topic => ({
          id: topic.id || `topic-${Math.random().toString(36).substr(2, 9)}`,
          name: topic.name || topic.title || 'Untitled Topic',
          title: topic.title || topic.name || 'Untitled Topic',
          description: topic.description || 'No description available.',
          isCompleted: topic.isCompleted || false,
          subtopics: topic.subtopics || [],
          difficulty: topic.difficulty || 'beginner',
          timeEstimate: topic.timeEstimate || '15 mins',
          progress: topic.progress || 0,
          icon: topic.icon || '📚'
        }));
        
        setTopics(formattedTopics);
        
        // Calculate and update progress
        const completedCount = formattedTopics.filter(topic => topic.isCompleted).length;
        const progressPercentage = Math.round((completedCount / formattedTopics.length) * 100);
        onProgressUpdate(progressPercentage);
      } else {
        // Log when no topics are found
        console.log('No topics found, using default topics for:', moduleName);
        const defaultTopics = [
          {
            id: `default-${moduleName}-1`,
            name: `Introduction to ${moduleName}`,
            title: `Introduction to ${moduleName}`,
            description: `This topic will introduce you to the basics of ${moduleName}.`,
            isCompleted: false,
            subtopics: [],
            difficulty: 'beginner' as const,
            timeEstimate: '15 mins',
            progress: 0,
            icon: '📚'
          },
          {
            id: `default-${moduleName}-2`,
            name: `Core Concepts of ${moduleName}`,
            title: `Core Concepts of ${moduleName}`,
            description: `Learn about the fundamental principles and concepts in ${moduleName}.`,
            isCompleted: false,
            subtopics: [],
            difficulty: 'intermediate' as const,
            timeEstimate: '20 mins',
            progress: 0,
            icon: '🧠'
          }
        ];
        setTopics(defaultTopics);
        onProgressUpdate(0);
      }
    } catch (err) {
      console.error('Error in fetchTopics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch topics');
      
      // Set default topics on error
      const defaultTopics = [
        {
          id: `error-${moduleName}-1`,
          name: 'Error Loading Topics',
          title: 'Error Loading Topics',
          description: "Sorry, there was an error loading the topics. Please try again later.",
          isCompleted: false,
          subtopics: [],
          difficulty: 'beginner' as const,
          timeEstimate: '15 mins',
          progress: 0,
          icon: '❌'
        }
      ];
      setTopics(defaultTopics);
      onProgressUpdate(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect with proper dependency
  useEffect(() => {
    if (moduleName) {
      console.log('ModuleTopicsList: Fetching topics on mount or moduleName change for:', moduleName);
      fetchTopics();
    }
  }, [moduleName]); // Only re-fetch when moduleName changes

  // Modified handler to update topic completion
  const handleTopicCompletion = async (topicId: string, isCompleted: boolean) => {
    try {
      console.log(`Updating topic completion: ${topicId}, current status: ${isCompleted}`);
      
      // Create updated topics array first for immediate UI update
      const updatedTopics = topics.map(topic => 
        topic.id === topicId 
          ? { ...topic, isCompleted: !isCompleted } 
          : topic
      );
      
      // Update UI immediately for better responsiveness
      setTopics(updatedTopics);
      
      // Calculate updated progress
      const completedCount = updatedTopics.filter(topic => topic.isCompleted).length;
      const progressPercentage = Math.round((completedCount / updatedTopics.length) * 100);
      onProgressUpdate(progressPercentage);
      
      // Then attempt API update
      const success = await updateTopicCompletion(topicId, !isCompleted);
      
      if (!success) {
        console.warn(`API failed to update topic ${topicId}, but UI was updated`);
      }
    } catch (err) {
      console.error('Error updating topic completion:', err);
      // Could add logic to revert UI change if needed
    }
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
              <Text style={styles.topicTitle} numberOfLines={1}>{item.title || item.name}</Text>
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
            <View style={[styles.progressBar, { width: `${(item.progress || 0) * 100}%` }]} />
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
        <>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3A86FF" />
              <Text style={styles.loadingText}>Loading topics...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={24} color="#F44336" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <FlatList
              data={topics}
              renderItem={renderTopicItem}
              keyExtractor={(item) => item.id}
              style={styles.topicsList}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No topics available for this module.</Text>
              }
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ...existing styles...
  
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    color: '#757575',
  },
  
  // Keep existing styles
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
  loadingText: {
    padding: 8,
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
  errorText: {
    padding: 8,
    textAlign: 'center',
    color: '#F44336',
    marginLeft: 8,
  },
});

export default ModuleTopicsList;
