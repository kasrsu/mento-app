import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  carouselContainer: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  recommendationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    height: 420, // Increased from 370
    width: '100%',
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 130, // Increased from 120
    marginBottom: 15,
    borderRadius: 12,
  },
  contentArea: {
    flex: 1,
    marginBottom: 15, // Added margin to create space
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 18,
    color: '#555',
    lineHeight: 26,
    marginBottom: 5, // Reduced from 20
  },
  buttonsContainer: {
    marginTop: 'auto',
    paddingTop: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
  },
  ratingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    minWidth: 130,
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  learnButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10, // Reduced from 15
    marginBottom: 5,
    alignSelf: 'center',
    width: '90%',
  },
  learnButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagBadge: {
    backgroundColor: '#E1F5FE',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#0277BD',
  },
});

