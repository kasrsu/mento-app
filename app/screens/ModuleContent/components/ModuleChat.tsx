import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModuleChatInterface from '../../../components/ModuleInterface/ModuleChatInterface';
import styles from '../styles';

interface ModuleChatProps {
  moduleTitle: string;
}

const ModuleChat: React.FC<ModuleChatProps> = ({ moduleTitle }) => {
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const chatHeightAnim = useRef(new Animated.Value(80)).current;
  const chatMaxHeight = Dimensions.get('window').height * 0.6;
  const screenHeight = Dimensions.get('window').height;
  
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

  return (
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
            <Text style={styles.chatHeaderTitle}>{moduleTitle} Assistant</Text>
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
          <ModuleChatInterface moduleTitle={moduleTitle} noHeader={true} />
        </View>
      )}
    </Animated.View>
  );
};

export default ModuleChat;
