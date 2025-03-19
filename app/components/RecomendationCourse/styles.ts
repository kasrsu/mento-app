// app/components/RecommendationsCarousel/styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#3A86FF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 200,
    marginBottom: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#3A86FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  seeMore: {
    fontSize: 14,
    color: '#3A86FF',
    fontWeight: '500',
    marginTop: -8,
    marginBottom: 16,
  },
  progressBar: {
    marginTop: 12,
    borderRadius: 4,
    height: 6,
  },
});