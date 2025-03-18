import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ProgressComponentProps {
  moduleName: string;
  totalTopics: number;
  completedTopics: number;
  topics: Array<{
    id: string;
    name: string;
    isCompleted: boolean;
  }>;
}

const ProgressComponent: React.FC<ProgressComponentProps> = ({
  moduleName,
  totalTopics,
  completedTopics,
  topics,
}) => {
  const progressWidth = new Animated.Value((completedTopics / totalTopics) * 100);

  const progressPercentage = Math.round((completedTopics / totalTopics) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.moduleTitle}>{moduleName}</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      
      <Text style={styles.progressText}>{progressPercentage}% Complete</Text>

      {/* Topics List */}
      <View style={styles.topicsList}>
        {topics.map((topic) => (
          <View key={topic.id} style={styles.topicItem}>
            <MaterialIcons
              name={topic.isCompleted ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={topic.isCompleted ? '#4CAF50' : '#757575'}
            />
            <Text style={[
              styles.topicText,
              topic.isCompleted && styles.completedTopicText
            ]}>
              {topic.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    color: '#757575',
    textAlign: 'right',
  },
  topicsList: {
    marginTop: 16,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topicText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
  completedTopicText: {
    color: '#4CAF50',
    textDecorationLine: 'line-through',
  },
});

export default ProgressComponent;