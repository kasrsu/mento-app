import React, { useState, useEffect } from 'react';
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
  moduleId: string;
  moduleName: string; // Add moduleName prop
}

const ModuleTopicsList: React.FC<ModuleTopicsListProps> = ({
  isExpanded,
  onToggleExpand,
  onProgressUpdate,
  moduleId,
  moduleName // Add moduleName to props
}) => {
  const [topics, setTopics] = useState<ModuleTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch topics from API
  const fetchTopics = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use moduleName instead of moduleId in the API call
      const response = await fetch(`http://192.168.231.152:8000/module-content/${encodeURIComponent(moduleName)}/topics`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch topics');
      }

      const responseData = await response.json();
      
      // Check if data is in the expected format - it should be an array
      if (Array.isArray(responseData)) {
        setTopics(responseData);
        
        // Calculate initial progress only if we have topics
        if (responseData.length > 0) {
          const completedTopics = responseData.filter((topic: ModuleTopic) => topic.isCompleted).length;
          const progressPercentage = Math.round((completedTopics / responseData.length) * 100);
          onProgressUpdate(progressPercentage);
        }
      } else if (responseData.topics && Array.isArray(responseData.topics)) {
        // Handle case where API returns { topics: [...] } format
        setTopics(responseData.topics);
        
        if (responseData.topics.length > 0) {
          const completedTopics = responseData.topics.filter((topic: ModuleTopic) => topic.isCompleted).length;
          const progressPercentage = Math.round((completedTopics / responseData.topics.length) * 100);
          onProgressUpdate(progressPercentage);
        }
      } else {
        // If the API response is not an array or doesn't have a topics array
        console.error('Unexpected API response format:', responseData);
        setError('Received invalid data format from server');
        // Set default empty array
        setTopics([]);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching topics:', err);
      // Set empty topics array on error
      setTopics([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Update topic completion status in backend
  const updateTopicCompletion = async (topicId: string, isCompleted: boolean) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`YOUR_API_BASE_URL/topics/${topicId}/completion`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted }),
      });

      if (!response.ok) {
        throw new Error('Failed to update topic completion');
      }

      return true;
    } catch (err) {
      console.error('Error updating topic completion:', err);
      return false;
    }
  };

  useEffect(() => {
    if (moduleName) { // Change condition to check for moduleName
      fetchTopics();
    }
  }, [moduleName]); // Change dependency to moduleName

  // Modified handler to update backend
  const handleTopicCompletion = async (topicId: string, isCompleted: boolean) => {
    const success = await updateTopicCompletion(topicId, !isCompleted);
    
    if (success) {
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

  // Add loading and error states to the render
  if (isLoading) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.loadingText}>Loading topics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // Check if topics exist and is an array
  if (!Array.isArray(topics) || topics.length === 0) {
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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No topics available for this module.</Text>
          </View>
        )}
      </View>
    );
  }

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
  loadingText: {
    padding: 16,
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    padding: 16,
    textAlign: 'center',
    color: '#ff0000',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#757575',
    textAlign: 'center',
  },
});

export default ModuleTopicsList;
