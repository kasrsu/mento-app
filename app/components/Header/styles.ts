// app/components/Header/styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});