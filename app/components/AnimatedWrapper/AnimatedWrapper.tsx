import React from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay 
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedWrapper = ({ children, delay = 0 }: Props) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  React.useEffect(() => {
    translateY.value = withDelay(delay, withSpring(0, { damping: 12 }));
    opacity.value = withDelay(delay, withSpring(1));
    scale.value = withDelay(delay, withSpring(1, { damping: 12 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value }
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
};