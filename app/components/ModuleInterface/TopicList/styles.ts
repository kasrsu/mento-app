import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  topicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f7ff',
  },
  completedIconContainer: {
    backgroundColor: '#e6f7ee',
  },
  textContainer: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEstimate: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  contentContainer: {
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtopicsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  subtopicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  subtopicItemLast: {
    borderBottomWidth: 0,
  },
  subtopicDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4a90e2',
    marginRight: 12,
  },
  subtopicDotCompleted: {
    backgroundColor: '#4CAF50',
  },
  subtopicText: {
    fontSize: 15,
    color: '#444',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginTop: 12,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    textAlign: 'right',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: '#4a90e2',
  },
  secondaryButton: {
    backgroundColor: '#f2f7ff',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#4a90e2',
  },
  expandCollapseButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f2f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
