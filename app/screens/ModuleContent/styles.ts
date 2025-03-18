import { StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default StyleSheet.create({
  seeMore: {
    color: '#2196F3',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  header: {
    backgroundColor: '#2196F3',
    paddingVertical: 55,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    marginTop: -25,
  },
});