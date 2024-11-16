// components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Header;
