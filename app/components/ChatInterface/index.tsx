import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import Animated, { useAnimatedStyle, withSpring, withSequence, withTiming, useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ChatScreenNavigationProp } from '../../navigation/types';
import styles from './styles';
import RecommendationsCarousel from '../RecomendationCourse';
import PopupMessage from './PoPupMessage/index';
import { useSession } from '../../../SessionContext';

// Keep existing axios configuration
axios.defaults.baseURL = 'http://192.168.231.152:8000';
axios.defaults.timeout = 1000000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

interface Message {
  type: 'user' | 'bot';
  text: string;
  id?: string;
}
interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  modules?: Module[];
  details?: string;
}

interface Module {
  id: string;
  name: string;
  description: string;
}

// Add animation components
const MessageBubble = ({ message }: { message: Message }) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0);
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[
      styles.messageBubble,
      message.type === 'user' ? styles.userBubble : styles.botBubble,
      animatedStyle
    ]}>
      <Text style={styles.messageText}>{message.text}</Text>
    </Animated.View>
  );
};

const TypingIndicator = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    const animation = () => {
      opacity.value = withSequence(
        withTiming(1, { duration: 500 }),
        withTiming(0.3, { duration: 500 })
      );
    };
    const interval = setInterval(animation, 1000);
    return () => clearInterval(interval);
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDot, dotStyle]} />
      <Animated.View style={[styles.typingDot, dotStyle]} />
      <Animated.View style={[styles.typingDot, dotStyle]} />
    </View>
  );
};

const ChatInterface = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const inputScale = useSharedValue(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { cachedModules = [], updateModules } = useSession(); // Use cachedModules instead of modules

  // Keep existing connection test
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get<ApiResponse>('/');
        console.log('Backend connection successful:', response.data);
      } catch (error) {
        console.error('Backend connection failed:', error);
        Alert.alert(
          'Connection Error',
          'Unable to connect to the chat server. Please check if the server is running.'
        );
      }
    };
    testConnection();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }

      const userMessage: Message = {
        type: 'user',
        text: input.trim(),
        id: Date.now().toString()
      };

      setMessages(prev => [...prev, userMessage]);
      const currentInput = input.trim();
      setInput('');

      const response = await axios.post<ApiResponse>('/chat', {
        message: currentInput
      });

      if (response.data && response.data.message) {
        const botMessage: Message = {
          type: 'bot',
          text: response.data.message,
          id: (Date.now() + 1).toString()
        };

        setMessages(prev => [...prev, botMessage]);

        if (response.data.modules && response.data.modules.length > 0) {
          await updateModules(response.data.modules);
          setTimeout(() => setIsVisible(true), 500);
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      setError('Failed to send message');
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleStartCourse = () => {
    try {
      setIsVisible(false);
      if (cachedModules && cachedModules.length > 0) {
        navigation.navigate('screens/Recommendations/index', {
          modules: cachedModules
        });
      }
    } catch (error) {
      console.error('Navigation error:', error);
      setError('Navigation failed');
      Alert.alert('Error', 'Failed to navigate to recommendations.');
    }
  };

  const inputStyle = useAnimatedStyle(() => ({
    transform: [{ scale: inputScale.value }]
  }));

  // Add cleanup effect
  useEffect(() => {
    return () => {
      setMessages([]);
      setIsLoading(false);
      setIsVisible(false);
      setError(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      >
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
      </ScrollView>

      {cachedModules?.length > 0 && (
        <RecommendationsCarousel modules={cachedModules} />
      )}
      
      <PopupMessage
        visible={isVisible}
        title="Start Recommended Courses"
        message="Do you want to start the recommended courses?"
        onYes={handleStartCourse}
        onNo={() => setIsVisible(false)}
      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Animated.View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          multiline
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <MaterialIcons 
            name="send" 
            size={24} 
            color={input.trim() && !isLoading ? '#2196F3' : '#ccc'} 
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ChatInterface;