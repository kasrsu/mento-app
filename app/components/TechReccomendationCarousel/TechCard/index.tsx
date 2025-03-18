import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

interface TechCardProps {
    imageUrl: string;
    title: string;
    onPress: () => void;
}

const TechCard: React.FC<TechCardProps> = ({ imageUrl, title, onPress }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Button title="Try Article" onPress={onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
});

export default TechCard;