// app/screens/chat/index.tsx
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ChatInterface from '../../components/ChatInterface';
import styles from './styles';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ChatInterface />
    </SafeAreaView>
  );
}