import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 40
  },
  logo: {
    width: 80,
    height: 80,
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff'
  }
});

export default styles;
