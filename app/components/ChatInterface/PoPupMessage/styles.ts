import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: width * 0.9,
    minHeight: height * 0.4, // Increased height
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 30,
    paddingTop: 60, // Increased top padding for Lottie
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to flex-start
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40, // Increased top margin
    color: '#2C3E50',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7F8C8D',
    lineHeight: 24,
    paddingHorizontal: 10,
    flex: 1, // Added flex
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto', // Push buttons to bottom
    paddingHorizontal: 10,
    marginBottom: 10, // Added bottom margin
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  yesButton: {
    backgroundColor: '#2196F3',
    borderWidth: 1,
    borderColor: '#43A047',
  },
  noButton: {
    backgroundColor: '#C4D9FF',
    borderWidth: 1,
    borderColor: '#C4D9FF',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lottieContainer: {
    width: 100, // Reduced size
    height: 100, // Reduced size
    marginBottom: 10, // Reduced margin
  },
  iconContainer: {
    position: 'absolute',
    top: -35, // Adjusted position
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 8, // Reduced padding
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
