// app/components/Header/index.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.nameText}>John Doe</Text>
        <Text style={styles.descriptionText}>Your Personalized Learning Guide</Text>
      </View>
      <TouchableOpacity>
        <Image 
          source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe' }}
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;