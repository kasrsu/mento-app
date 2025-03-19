import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

// Import components
import {
  ModuleHeader,
  ModuleProgress,
  ResourceSection,
  ModuleChat,
  ModuleTopicsList
} from './components';

// Import styles
import styles from './styles';

type ModuleContentScreenRouteProp = RouteProp<RootStackParamList, 'ModuleContent'>;

const ModuleContent: React.FC = () => {
  // Use useRoute hook to get route parameters
  const route = useRoute<ModuleContentScreenRouteProp>();
  
  // Add detailed logging for debugging
  console.log("ModuleContent - Raw route object:", route);
  
  // Extract params with fallback
  const moduleName = route.params?.moduleName || 'Default Module';
  const moduleId = route.params?.moduleId || 'unknown';
  
  // Log what we're actually passing to the header
  console.log("ModuleContent - Final moduleName to pass:", moduleName);
  
  // UI state - initialize with a constant value
  const [expandedSection, setExpandedSection] = useState<string | null>('topics');
  const [progressPercentage, setProgressPercentage] = useState(0); // Start at 0 by default
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Only update progress when explicitly called by a component
  const handleProgressUpdate = (percentage: number) => {
    console.log('Progress update requested:', percentage);
    setProgressPercentage(percentage);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#3A86FF" />
        
        {/* Header Component - Pass only moduleName */}
        <ModuleHeader 
          moduleName={moduleName} 
        />

        {/* Progress Bar Component */}
        <ModuleProgress progressPercentage={progressPercentage} />

        {/* Main Content */}
        <ScrollView style={styles.contentContainer} contentContainerStyle={styles.contentContainerStyle}>
          {/* Topics Component */}
          <ModuleTopicsList
            isExpanded={expandedSection === 'topics'}
            onToggleExpand={() => toggleSection('topics')}
            onProgressUpdate={handleProgressUpdate}
          />

          {/* Resources Section Component */}
          <ResourceSection 
            isExpanded={expandedSection === 'resources'}
            onToggleExpand={() => toggleSection('resources')}
          />
        </ScrollView>

        {/* Chat Interface Component */}
        <ModuleChat moduleTitle={moduleName} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ModuleContent;