import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const scrollViewRef = useRef<ScrollView>(null);

  // Quick reply options
  const quickReplies: QuickReply[] = [
    { id: '1', text: 'Explain in simple terms', action: 'explain_simple' },
    { id: '2', text: 'Give an example', action: 'give_example' },
    { id: '3', text: 'More resources', action: 'more_resources' },
    { id: '4', text: 'Course structure', action: 'course_structure' },
    { id: '5', text: 'Key concepts', action: 'key_concepts' },
  ];

  // Initialize chat with greeting
  useEffect(() => {
    // Add welcome message when component mounts
    setMessages([
      {
        id: '1',
        text: `Hey! Ready to dive into ${moduleTitle}? Ask me anything about this module!`,
        sender: 'assistant',
        timestamp: new Date(),
      },
    ]);
  }, [moduleTitle]);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Here's some information about "${inputText}" related to ${moduleTitle}. What else would you like to know?`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickReply = (reply: QuickReply) => {
    // Process quick reply based on action
    const replyMessage: ChatMessage = {
      id: Date.now().toString(),
      text: reply.text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, replyMessage]);
    setIsLoading(true);
    
    // Simulate response based on quick reply
    setTimeout(() => {
      let responseText = '';
      switch (reply.action) {
        case 'explain_simple':
          responseText = `Here's ${moduleTitle} explained in simple terms...`;
          break;
        case 'give_example':
          responseText = `Here's an example from ${moduleTitle}...`;
          break;
        case 'more_resources':
          responseText = `Here are some additional resources for ${moduleTitle}...`;
          break;
        case 'course_structure':
          responseText = `The ${moduleTitle} course is structured as follows...`;
          break;
        case 'key_concepts':
          responseText = `Key concepts in ${moduleTitle} include...`;
          break;
        default:
          responseText = `Let me help you with that.`;
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
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
  const shouldShowQuickReplies = messages.length <= 2;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
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
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
});

export default ModuleChatInterface;