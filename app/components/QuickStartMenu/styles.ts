// app/components/QuickStartMenu/styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});