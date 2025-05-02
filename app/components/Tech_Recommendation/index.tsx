import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';
import axios from 'axios';

// Update the interface to match your API response structure
interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  url?: string;
  created_at?: string;
}

const width = Dimensions.get('window').width;
const API_BASE_URL = 'http://192.168.245.152:8000/api';  // Update this with your server IP

const TechRecommendation: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recommendations when component mounts
  useEffect(() => {
    fetchTrendingRecommendations();
  }, []);

  const fetchTrendingRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tech-recommendations/trending?limit=5`);
      setRecommendations(response.data as RecommendationItem[]);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleLearn = (item: RecommendationItem) => {
    // If the item has a URL, you could open it
    if (item.url) {
      console.log('Opening URL:', item.url);
      // You would use Linking.openURL here
    } else {
      console.log('Learn more about:', item.id);
    }
  };

  interface RatingResponse {
    success: boolean;
  }

  const handleRating = async (moduleId: string, isEffective: boolean) => {
    try {
      const response = await axios.post<RatingResponse>(`${API_BASE_URL}/tech-recommendations/rating`, {
        id: moduleId,
        isEffective: isEffective
      });
      
      if (response.data.success) {
        Alert.alert(
          'Thank You', 
          `Your feedback has been recorded. ${isEffective ? 'Glad you found it useful!' : 'We\'ll improve our recommendations.'}`
        );
      }
    } catch (err) {
      console.error('Failed to submit rating:', err);
      Alert.alert('Error', 'Failed to submit your rating. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading recommendations...</Text>
      </View>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>{error || 'No recommendations available'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchTrendingRecommendations}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Tech Recommendations</Text>
        <Carousel
          loop
          width={width * 0.92}
          height={500}
          autoPlay={true}
          data={recommendations}
          scrollAnimationDuration={100}
          autoPlayInterval={2000}
          mode="parallax"
          defaultIndex={0}
          renderItem={({ item }) => (
            <View style={styles.recommendationWrapper}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                {/* Use a default image if none provided */}
                <Image 
                  source={{ 
                    uri: item.url || 
                    'https://via.placeholder.com/150?text=Tech+Article'
                  }} 
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.contentArea}>
                  <Text style={styles.title}>Recommended for You</Text>
                  <Text style={styles.description}>
                    {item.description ? 
                      (item.description.length > 100 ? 
                        `${item.description.substring(0, 100)}...` : 
                        item.description) : 
                      'No description available'}
                  </Text>
                  {item.tags && item.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <View key={index} style={styles.tagBadge}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.learnButton}
                  onPress={() => handleLearn(item)}
                >
                  <Text style={styles.learnButtonText}>Learn More</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.ratingContainer}>
                <TouchableOpacity 
                  style={styles.ratingButton}
                  onPress={() => handleRating(item.id, true)}
                >
                  <Ionicons name="thumbs-up" size={22} color="#4CAF50" />
                  <Text style={styles.ratingText}>Effective</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.ratingButton}
                  onPress={() => handleRating(item.id, false)}
                >
                  <Ionicons name="thumbs-down" size={22} color="#F44336" />
                  <Text style={styles.ratingText}>Not Useful</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          onScrollStart={() => true}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
            parallaxAdjacentItemScale: 0.8,
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default TechRecommendation;