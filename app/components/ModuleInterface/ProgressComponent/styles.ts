import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resourceTitle: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  bookmarkButton: {
    padding: 8,
  },
});

export default styles;