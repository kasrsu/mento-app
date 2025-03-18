import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolate,
  Easing, 
} from 'react-native-reanimated';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import styles from './styles';

export type Subtopic = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TopicProps = {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate: string;
  progress: number;
  isCompleted: boolean;
  onPress?: (id: string) => void;
};

const Topic: React.FC<TopicProps> = ({
  id,
  title,
  description,
  subtopics,
  difficulty,
  timeEstimate,
  progress,
  isCompleted,
  onPress,
}) => {
  const [expanded, setExpanded] = useState(false);
  const rotationValue = useSharedValue(0);
  const heightValue = useSharedValue(0);

  const toggleExpand = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    
    rotationValue.value = withTiming(newExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    
    heightValue.value = withTiming(newExpanded ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const rotationStyle = useAnimatedStyle(() => {
    const rotation = interpolate(rotationValue.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return { bg: '#e6f7ee', text: '#4CAF50' };
      case 'intermediate':
        return { bg: '#fff8e6', text: '#FFC107' };
      case 'advanced':
        return { bg: '#ffeeee', text: '#F44336' };
      default:
        return { bg: '#f0f0f0', text: '#000'};
    }
  };

  const handlePress = () => {
    if (onPress) onPress(id);
  };

  const difficultyColors = getDifficultyColor();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.topicHeader} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.topicInfo}>
          <View style={[
            styles.iconContainer,
            isCompleted && styles.completedIconContainer
          ]}>
            {isCompleted ? (
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            ) : (
              <MaterialIcons name="play-circle-outline" size={24} color="#4a90e2" />
            )}
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.topicTitle}>{title}</Text>
            <View style={styles.topicMeta}>
              <Text style={styles.timeEstimate}>{timeEstimate}</Text>
              <View 
                style={[
                  styles.difficultyBadge, 
                  { backgroundColor: difficultyColors.bg }
                ]}
              >
                <Text 
                  style={[
                    styles.difficultyText, 
                    { color: difficultyColors.text }
                  ]}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <Animated.View style={rotationStyle}>
          <MaterialIcons 
            name="keyboard-arrow-down" 
            size={24} 
            color="#888"
          />
        </Animated.View>
      </TouchableOpacity>
      
      {expanded && (
        <Animated.View
          style={[styles.contentContainer]}
        >
          <Text style={styles.description}>{description}</Text>
          
          {subtopics.length > 0 && (
            <View style={styles.subtopicsContainer}>
              {subtopics.map((subtopic, index) => (
                <View 
                  key={subtopic.id} 
                  style={[
                    styles.subtopicItem,
                    index === subtopics.length - 1 && styles.subtopicItemLast
                  ]}
                >
                  <View 
                    style={[
                      styles.subtopicDot,
                      subtopic.isCompleted && styles.subtopicDotCompleted
                    ]} 
                  />
                  <Text style={styles.subtopicText}>{subtopic.title}</Text>
                </View>
              ))}
            </View>
          )}
          
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={progress} 
              color="#4a90e2" 
              style={styles.progressBar} 
            />
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}% Complete
            </Text>
          </View>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handlePress}
            >
              <Feather name="play" size={16} color="#fff" />
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                {isCompleted ? 'Review Topic' : 'Start Learning'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
            >
              <FontAwesome5 name="bookmark" size={16} color="#4a90e2" />
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Topic;
