import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import axios from 'axios';
import AxiosError from 'axios-error';

interface Message {
  type: 'user' | 'bot';
  text: string;
}

// Configure axios for Android
//axios.defaults.baseURL = 'http://10.0.2.2:8000';  // For Android Emulator
axios.defaults.baseURL = 'http://192.168.1.3:8000';  // For Physical Device
axios.defaults.timeout = 30000; // Increase timeout to 30 seconds
axios.defaults.headers.common['Content-Type'] = 'application/json';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Test connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        await axios.get('/');
        console.log('Backend connection successful');
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
    if (input.trim()) {
      const userMessage: Message = { type: 'user', text: input.trim() };
      const currentInput = input.trim();
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        console.log('Sending message:', currentInput);
        interface ChatResponse {
          message: string;
        }

        const response = await axios.post<ChatResponse>('/chat', {
          message: currentInput
        });

        console.log('Received response:', response.data);
        
        if (response.data && response.data.message) {
          const botMessage: Message = { 
            type: 'bot', 
            text: response.data.message 
          };
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error details:', error);
        
        let errorMessage = 'Unable to send message. ';
        if (error instanceof AxiosError) {
          errorMessage += error.message;
          if (error.response) {
            console.log('Error response:', error.response);
          }
        }
        
        Alert.alert('Error', errorMessage);
        // Restore the input in case of error
        setInput(currentInput);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.messageList}
        ref={ref => {
          if (ref) {
            ref.scrollToEnd({ animated: true });
          }
        }}
      >
        {messages.map((message, index) => (
          <View 
            key={index} 
            style={[
              message.type === 'user' ? styles.userMessage : styles.botMessage,
              styles.messageContainer
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Waiting for response...</Text>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.inputBox,
            isLoading && styles.inputDisabled
          ]}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          editable={!isLoading}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!input.trim() || isLoading) && styles.sendButtonDisabled
          ]} 
          onPress={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInterface;