import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import Animated, { useAnimatedStyle, withSpring, withSequence, withTiming, useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// Keep existing axios configuration 
axios.defaults.baseURL = 'http://192.168.103.152:8000';
axios.defaults.timeout = 1000000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// API response interface
interface ModuleChatResponse {
  status: 'success' | 'error';
  message: string;
  details?: string;
  relatedContent?: {
    title: string;
    content: string;
  }[];
}

// Chat message type definition
interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isPinned?: boolean;
}

// Quick reply option type
interface QuickReply {
  id: string;
  text: string;
  action: string;
}

interface ModuleChatInterfaceProps {
  moduleTitle?: string;
  noHeader?: boolean;
}

const ModuleChatInterface: React.FC<ModuleChatInterfaceProps> = ({ 
  moduleTitle = "Module Name",
  noHeader = false 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Quick reply options
  const quickReplies: QuickReply[] = [
    { id: '1', text: 'Explain in simple terms', action: 'explain_simple' },
    { id: '2', text: 'Give an example', action: 'give_example' },
    { id: '3', text: 'More resources', action: 'more_resources' },
    { id: '4', text: 'Course structure', action: 'course_structure' },
    { id: '5', text: 'Key concepts', action: 'key_concepts' },
  ];

  // Test backend connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get('/');
        console.log('Backend connection successful:', response.data);
        setConnectionError(null);
      } catch (error) {
        console.error('Backend connection failed:', error);
        setConnectionError('Unable to connect to server');
      }
    };
    
    testConnection();
    
    // Add welcome message
    setMessages([
      {
        id: '1',
        text: `Hey! Ready to dive into ${moduleTitle}? Ask me anything about this module!`,
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, [moduleTitle]);

  // Function to send message to backend API
  const sendMessageToBackend = async (message: string, moduleContext: string) => {
    try {
      console.log(`Sending message to backend: ${message} for module: ${moduleContext}`);
      
      // Create a request object that matches your backend's expected format
      const requestData = {
        message: message,
        context: {
          module: moduleContext,
          type: 'module_query'
        }
      };
      
      // Use the existing /chat endpoint
      const response = await axios.post<ModuleChatResponse>('/chat', requestData);
      
      console.log('Backend response:', response.data);
      
      if (response.data && response.data.message) {
        return response.data.message;
      } else {
        throw new Error(response.data.details || 'Unknown error occurred');
      }
    } catch (error) {
      throw new Error('Failed to get response from server');
    }
  };

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const newMessage: ChatMessage = {
      id: userMessageId,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Give haptic feedback if on a mobile device
      if (Platform.OS !== 'web') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      
      // Get response from backend
      const responseText = await sendMessageToBackend(inputText.trim(), moduleTitle);
      
      // Add assistant message with response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to process message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error 
          ? error.message 
          : 'Sorry, I had trouble processing your request. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Scroll to bottom after a short delay to ensure render is complete
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleQuickReply = async (reply: QuickReply) => {
    if (isLoading) return;
    
    // Process quick reply
    const replyMessage: ChatMessage = {
      id: Date.now().toString(),
      text: reply.text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, replyMessage]);
    setIsLoading(true);
    
    try {
      // Construct a more detailed query based on the quick reply action
      let queryText = '';
      switch (reply.action) {
        case 'explain_simple':
          queryText = `Please explain ${moduleTitle} in simple terms.`;
          break;
        case 'give_example':
          queryText = `Give me a practical example from ${moduleTitle}.`;
          break;
        case 'more_resources':
          queryText = `What additional resources do you recommend for learning ${moduleTitle}?`;
          break;
        case 'course_structure':
          queryText = `Explain the structure of the ${moduleTitle} course.`;
          break;
        case 'key_concepts':
          queryText = `What are the key concepts in ${moduleTitle}?`;
          break;
        default:
          queryText = reply.text;
      }
      
      // Get response from backend
      const responseText = await sendMessageToBackend(queryText, moduleTitle);
      
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to process quick reply:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error 
          ? error.message 
          : 'Sorry, I had trouble with that request. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const togglePinMessage = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
    ));
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Only show quick replies for the first few messages
  const shouldShowQuickReplies = messages.length <= 3;

  return (
    <View style={styles.container}>
      {/* Connection error banner */}
      {connectionError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{connectionError}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              // Retry connection
              axios.get('/')
                .then(() => setConnectionError(null))
                .catch(err => console.error('Retry failed:', err));
            }}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Module title header - Only shown if noHeader is false */}
      {!noHeader && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{moduleTitle} Chat</Text>
        </View>
      )}
      
      {/* Pinned messages section */}
      {messages.some(msg => msg.isPinned) && (
        <View style={styles.pinnedContainer}>
          <Text style={styles.pinnedHeader}>Pinned Messages</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {messages.filter(msg => msg.isPinned).map(pinnedMsg => (
              <View key={`pinned-${pinnedMsg.id}`} style={styles.pinnedMessage}>
                <Text numberOfLines={2} style={styles.pinnedText}>{pinnedMsg.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Chat messages - Flex grows to fill available space */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <View 
            key={message.id}
            style={[
              styles.messageBubble, 
              message.sender === 'user' ? styles.userBubble : styles.assistantBubble
            ]}
          >
            <Text style={[
              styles.messageText,
              message.sender === 'user' && styles.userMessageText
            ]}>
              {message.text}
            </Text>
            <View style={styles.messageActions}>
              <TouchableOpacity onPress={() => togglePinMessage(message.id)}>
                <Ionicons 
                  name={message.isPinned ? "bookmark" : "bookmark-outline"} 
                  size={16} 
                  color={message.isPinned ? "#FFA500" : "#888"} 
                />
              </TouchableOpacity>
            </View>
            <Text style={[
              styles.timestamp,
              message.sender === 'user' && styles.userTimestamp
            ]}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#3A86FF" />
            <Text style={styles.loadingText}>Getting answer...</Text>
          </View>
        )}
      </ScrollView>
      
      {/* Quick replies - Fixed height now */}
      {shouldShowQuickReplies && (
        <View style={styles.quickRepliesWrapper}>
          <Text style={styles.suggestedQuestionsText}>Suggested questions:</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.quickRepliesContainer}
            contentContainerStyle={styles.quickRepliesContent}
          >
            {quickReplies.map(reply => (
              <TouchableOpacity
                key={reply.id}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReply(reply)}
                disabled={isLoading}
              >
                <Text style={styles.quickReplyText}>{reply.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask about this module..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton, 
            (!inputText.trim() || isLoading) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D3748',
  },
  pinnedContainer: {
    padding: 10,
    backgroundColor: '#F0F4FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E5EE',
  },
  pinnedHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  pinnedMessage: {
    backgroundColor: '#FFF',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    maxWidth: 200,
    borderLeftWidth: 3,
    borderLeftColor: '#FFA500',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  pinnedText: {
    fontSize: 13,
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
    paddingBottom: 20,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
    maxWidth: '85%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: '#3A86FF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E5EE',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  userMessageText: {
    color: '#FFF',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loadingContainer: {
    padding: 10,
    alignItems: 'center',
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  // Fixed height quick replies container
  quickRepliesWrapper: {
    backgroundColor: '#F0F4FF',
    borderTopWidth: 1,
    borderTopColor: '#E0E5EE',
    height: 90, // Fixed height
  },
  suggestedQuestionsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    paddingLeft: 15,
    paddingTop: 8,
  },
  quickRepliesContainer: {
    height: 60, // Fixed height for the ScrollView
  },
  quickRepliesContent: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  quickReplyButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 18,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#D0D8E8',
    height: 36, // Fixed height for the buttons
    justifyContent: 'center',
  },
  quickReplyText: {
    color: '#3A86FF',
    fontWeight: '500',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E5EE',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#3A86FF',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#9EB8E8',
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  retryButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  retryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 5,
    fontWeight: '600',
    color: '#666',
    fontSize: 12,
  },
});
export default ModuleChatInterface;