import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import TechCard from './TechCard';

const { width } = Dimensions.get('window');

interface TechItem {
    // Define the properties of a TechItem here
    id: number;
    name: string;
    imageUrl: string;
    title: string;
    onPress: () => void;
}

interface TechRecommendationCarouselProps {
    techItems: TechItem[];
}

const TechRecommendationCarousel: React.FC<TechRecommendationCarouselProps> = ({ techItems }) => {
    return (
        <View style={styles.carouselContainer}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {techItems.map((item, index) => (
                    <View style={styles.cardContainer} key={index}>
                        <TechCard {...item} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    cardContainer: {
        width: width * 0.8,
        marginHorizontal: width * 0.1,
    },
});

export default TechRecommendationCarousel;