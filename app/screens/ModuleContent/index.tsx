import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import components
import ModuleChatInterface from '../../components/ModuleInterface/ModuleChatInterface';
import ResourceList from '../../components/ModuleInterface/ResorceList';
import ModuleTopics from '../../components/ModuleInterface/ModuleTopics';
import { TopicProps } from '../../components/ModuleInterface/TopicList';

interface ModuleContentProps {
  moduleName: string;
  moduleDescription: string;
}

type ModuleTopic = Omit<TopicProps, 'onPress'>;

const ModuleContent: React.FC<ModuleContentProps> = ({ moduleName, moduleDescription }) => {
  // Sample topic data - simplified for clarity
  const [topics, setTopics] = useState<ModuleTopic[]>([
    { 
      id: '1', 
      title: 'Introduction to the Module', 
      description: 'The conspiracy angle often overlaps with anti-Semitic tropes, historically blaming Jewish figures (like the Rothschilds) for orchestrating global control—a thread tracing back to texts like the fabricated Protocols of the Elders of Zion. Today, it’s a buzzword in far-right circles, militia movements, and online spaces, where it’s linked to everything from the World Economic Forum to vaccine mandates.', 
      isCompleted: true, 
      subtopics: [], 
      difficulty: 'beginner', 
      timeEstimate: '10 mins', 
      progress: 1 
    },
    { 
      id: '2', 
      title: 'Core Concepts', 
      description: 'n practice, the term’s a Rorschach test—politicians might mean a new geopolitical reality, while theorists see a shadowy endgame. There’s no hard evidence of a unified globalist plot, but the idea persists because it feeds on real anxieties about power, technology, and change. What’s your angle on it? Are you thinking historical shifts or the conspiracy rabbit hole?', 
      isCompleted: false, 
      subtopics: [], 
      difficulty: 'intermediate', 
      timeEstimate: '20 mins', 
      progress: 0.5 
    },
    // ... other topics
  ]);

  // UI state
  const [expandedSection, setExpandedSection] = useState<string | null>('topics');
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Animation values
  const chatHeightAnim = useRef(new Animated.Value(80)).current;
  const chatMaxHeight = Dimensions.get('window').height * 0.6;
  const screenHeight = Dimensions.get('window').height;
  
  // Calculate progress
  const totalTopics = topics.length;
  const completedTopics = topics.filter(topic => topic.isCompleted).length;
  const progressPercentage = Math.round((completedTopics / totalTopics) * 100);

  // Handler functions
  const handleTopicCompletion = (topicId: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId 
        ? { ...topic, isCompleted: !topic.isCompleted } 
        : topic
    ));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const handleChatFocus = () => {
    setIsChatFocused(true);
    Animated.spring(chatHeightAnim, {
      toValue: isFullScreen ? screenHeight : chatMaxHeight,
      friction: 7,
      tension: 40,
      useNativeDriver: false,
    }).start();
  };
  
  const handleChatBlur = () => {
    setIsChatFocused(false);
    setIsFullScreen(false);
    Animated.timing(chatHeightAnim, {
      toValue: 80,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  
  const toggleFullScreen = () => {
    const newIsFullScreen = !isFullScreen;
    setIsFullScreen(newIsFullScreen);
    
    Animated.spring(chatHeightAnim, {
      toValue: newIsFullScreen ? screenHeight : chatMaxHeight,
      friction: 7,
      tension: 40,
      useNativeDriver: false,
    }).start();
  };

  // Render resources section
  const renderResourcesSection = () => (
    <View style={styles.sectionContainer}>
      <TouchableOpacity 
        style={[styles.sectionHeader, expandedSection === 'resources' && styles.activeSection]}
        onPress={() => toggleSection('resources')}
      >
        <View style={styles.sectionTitleContainer}>
          <Ionicons name="document-text-outline" size={22} color="#4A6FA5" />
          <Text style={styles.sectionTitle}>Learning Resources</Text>
        </View>
        <Ionicons 
          name={expandedSection === 'resources' ? "chevron-up" : "chevron-down"}
          size={22} 
          color="#4A6FA5" 
        />
      </TouchableOpacity>
      
      {expandedSection === 'resources' && <ResourceList />}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#3A86FF" />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.moduleNameBadge}>{moduleName}</Text>
          <Text style={styles.moduleDescription}>{moduleDescription}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{progressPercentage}% Complete</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.contentContainer} contentContainerStyle={styles.contentContainerStyle}>
          {/* Topics Component */}
          <ModuleTopics 
            topics={topics}
            isExpanded={expandedSection === 'topics'}
            onToggleExpand={() => toggleSection('topics')}
            onTopicPress={handleTopicCompletion}
          />

          {/* Resources Section */}
          {renderResourcesSection()}
        </ScrollView>

        {/* Chat Interface */}
        <Animated.View 
          style={[
            styles.chatContainer, 
            { height: chatHeightAnim },
            isFullScreen && styles.fullScreenChat
          ]}
        >
          {!isChatFocused ? (
            <View style={styles.collapsedChatContainer}>
              <TextInput
                style={styles.collapsedChatInput}
                placeholder="Ask about this module..."
                onFocus={handleChatFocus}
              />
              <TouchableOpacity style={styles.collapsedSendButton}>
                <Ionicons name="send" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.expandedChatContainer}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatHeaderTitle}>{moduleName} Assistant</Text>
                <View style={styles.chatHeaderActions}>
                  <TouchableOpacity 
                    style={styles.headerIconButton}
                    onPress={toggleFullScreen}
                  >
                    <Ionicons 
                      name={isFullScreen ? "contract-outline" : "expand-outline"} 
                      size={22} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.headerIconButton}
                    onPress={handleChatBlur}
                  >
                    <Ionicons name="close" size={22} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              <ModuleChatInterface moduleTitle={moduleName} noHeader={true} />
            </View>
          )}
        </Animated.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // ...existing styles...
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#3A86FF',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#3A86FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  moduleNameBadge: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
    lineHeight: 22,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
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
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  sectionContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
  },
  activeSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#3A86FF',
    backgroundColor: '#F0F7FF',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginLeft: 10,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    overflow: 'hidden',
    zIndex: 100,
  },
  fullScreenChat: {
    top: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  collapsedChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  collapsedChatInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#F0F4FF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  collapsedSendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#3A86FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  expandedChatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  chatHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    padding: 5,
    marginLeft: 10,
  },
});

export default ModuleContent;