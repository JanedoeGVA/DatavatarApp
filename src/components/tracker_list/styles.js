import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  itemSeparator: { height: 1, width: '100%', backgroundColor: '#CCD1D1' },
  container: {
    flex: 1,
    padding: 8,
    marginTop: 30,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'center', // cross axis
    backgroundColor: '#FFFFFF'
  },
  flatlist: {
    marginTop: 14,
    alignSelf: 'stretch'
  }
});

export default styles;
