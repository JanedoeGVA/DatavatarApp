import React from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const SwipableList = ({ data }) => (
  <SwipeListView
    data={data}
    renderItem={(data, rowMap) => (
      <View style={styles.rowFront}>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View>
    )}
    renderHiddenItem={(data, rowMap) => (
      <View style={styles.rowBack}>
        <Image
          source={require('../../assets/images/delete-icon.png')}
          style={styles.trash}
        />
      </View>
    )}
    leftOpenValue={75}
    rightOpenValue={-75}
  />
);

export default SwipableList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    color: '#FFF'
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4
  },
  trash: {
    height: 25,
    width: 25
  }
});
