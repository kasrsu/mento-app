// app/components/FooterNavBar/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from './styles';

const navItems: { id: number; label: string; icon: 'home' | 'explore' | 'trending-up' | 'notifications' | 'chat'; route: string }[] = [
  { id: 1, label: 'Home', icon: 'home', route: '/screens/home' },
  { id: 3, label: 'Progress', icon: 'trending-up', route: '/screens/Recommendations' },
  { id: 4, label: 'clear', icon: 'notifications', route: '/screens/ClearSession' },
  { id: 5, label: 'Chat', icon: 'chat', route: '/screens/Chat' },
  { id: 2, label: 'Dashboard', icon: 'dashboard', route: '/screens/Dashboard' }
];

const FooterNavBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.navItem} onPress={() => router.push(item.route as any)}>
          <MaterialIcons name={item.icon} size={24} color="#333" />
          <Text style={styles.navLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterNavBar;