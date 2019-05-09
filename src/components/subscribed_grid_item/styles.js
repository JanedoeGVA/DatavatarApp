import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  itemAvailable: {
    fontSize: 16,
    color: '#008000',
    fontWeight: '600'
  },
  itemNotAvailable: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: '600'
  },
  opacity: 50
});

export default styles;
