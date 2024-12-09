import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withDelay 
} from 'react-native-reanimated';
import styles from './styles';

const Header = () => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const avatarRotate = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSequence(
      withDelay(300, withSpring(1))
    );
    scale.value = withSpring(1);
    avatarRotate.value = withSpring(360);
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const animatedAvatarStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${avatarRotate.value}deg` }
    ],
  }));

  return (
    <View style={styles.header}>
      <Animated.View style={[styles.welcomeSection, animatedTextStyle]}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.nameText}>John Doe</Text>
        <Text style={styles.descriptionText}>Your Personalized Learning Guide</Text>
      </Animated.View>
      <Animated.View style={animatedAvatarStyle}>
        <TouchableOpacity>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Header;