import React from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import Topic from './index';

const TopicExample = () => {
  const sampleTopics = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamental concepts of machine learning, including supervised and unsupervised learning, model evaluation, and common algorithms.',
      subtopics: [
        { id: '1-1', title: 'What is Machine Learning?', isCompleted: true },
        { id: '1-2', title: 'Supervised vs Unsupervised Learning', isCompleted: true },
        { id: '1-3', title: 'Common ML Algorithms Overview', isCompleted: false },
        { id: '1-4', title: 'Model Evaluation Techniques', isCompleted: false },
      ],
      difficulty: 'beginner' as const,
      timeEstimate: '2 hours',
      progress: 0.5,
      isCompleted: false,
    },
    {
      id: '2',
      title: 'Neural Networks Fundamentals',
      description: 'Explore the architecture and principles behind neural networks, including perceptrons, activation functions, and backpropagation.',
      subtopics: [
        { id: '2-1', title: 'Perceptrons and Neurons', isCompleted: true },
        { id: '2-2', title: 'Activation Functions', isCompleted: true },
        { id: '2-3', title: 'Backpropagation Explained', isCompleted: true },
        { id: '2-4', title: 'Building Your First Neural Network', isCompleted: true },
      ],
      difficulty: 'intermediate' as const,
      timeEstimate: '3.5 hours',
      progress: 1,
      isCompleted: true,
    },
    {
      id: '3',
      title: 'Advanced Deep Learning Techniques',
      description: 'Dive into advanced deep learning methods including convolutional neural networks (CNNs), recurrent neural networks (RNNs), and transformers.',
      subtopics: [
        { id: '3-1', title: 'Convolutional Neural Networks', isCompleted: false },
        { id: '3-2', title: 'Recurrent Neural Networks', isCompleted: false },
        { id: '3-3', title: 'Attention Mechanisms', isCompleted: false },
        { id: '3-4', title: 'Transformer Architectures', isCompleted: false },
      ],
      difficulty: 'advanced' as const,
      timeEstimate: '5 hours',
      progress: 0.1,
      isCompleted: false,
    },
  ];

  const handleTopicPress = (id: string) => {
    console.log(`Topic with id ${id} pressed`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>
          Module: Artificial Intelligence
        </Text>
        
        {sampleTopics.map((topic) => (
          <Topic
            key={topic.id}
            {...topic}
            onPress={handleTopicPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopicExample;
