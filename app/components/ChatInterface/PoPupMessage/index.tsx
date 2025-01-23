import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';

interface PopupMessageProps {
  visible: boolean;
  title: string;
  message: string;
  onYes: () => void;
  onNo: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  visible,
  title,
  message,
  onYes,
  onNo,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 7,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Start Lottie animation after popup appears
        lottieRef.current?.play();
      });
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 65,
          friction: 7,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleYes = () => {
    lottieRef.current?.play(0, 50);
    setTimeout(onYes, 500);
  };

  const handleNo = () => {
    lottieRef.current?.play(50, 100);
    setTimeout(onNo, 500);
  };

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.overlay,
        { opacity: fadeAnim }
      ]}
    >
      <Animated.View
        style={[
          styles.popup,
          {
            transform: [
              { scale: scaleAnim },
              {
                translateY: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <LottieView
            ref={lottieRef}
            source={require('./animations/question.json')}
            style={styles.lottieContainer}
            autoPlay={false}
            loop={false}
          />
        </View>
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={handleNo}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.yesButton]}
            onPress={handleYes}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default PopupMessage;
