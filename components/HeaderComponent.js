/*
Header Componenent = "Header" of all screens
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Alert
} from 'react-native';
import { deleteAllApi, insertApi } from '@databases/baseSchemas';

const HeaderComponent = props => {
  const {
    title,
    showAddTodoList,
    hasAddButton,
    hasSortButton,
    sort,
    sortState,
    hasDeleteAllButton
  } = props;
  return (
    <View style={styles.container}>
      {hasAddButton && (
        //<TouchableOpacity style={styles.addButton} onPress={showAddTodoList}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            const newApi = {
              name: 'Fitbit',
              creationDate: new Date(),
              accessToken: 'asdsad2233fffgpésdpkfamf23rmlé23ér3r3'
            };
            insertApi(newApi)
              .then()
              .catch(error => {
                alert(`Insert new todoList error ${error}`);
              });
          }}
        >
          <Image
            style={styles.addButtonImage}
            source={require('@images/add-icon.png')}
          />
        </TouchableOpacity>
      )}
      {hasDeleteAllButton && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            Alert.alert(
              'Delete all',
              'Are you sure you want to delete all Api ?',
              [
                {
                  text: 'No',
                  onPress: () => {},
                  style: 'cancel'
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    deleteAllApi()
                      .then()
                      .catch(error => {
                        alert(`Delete all Api failed. Error = ${error}`);
                      });
                  }
                }
              ],
              { cancelable: true }
            );
          }}
        >
          <Image
            style={styles.deleteButtonImage}
            source={require('@images/delete-icon.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#2f94f5',
    height: Platform.OS === 'ios' ? 100 : 80
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 50
  },
  addButton: {
    zIndex: 2,
    marginRight: 10,
    marginTop: 30
  },
  addButtonImage: {
    width: 42,
    height: 42,
    tintColor: 'white'
  },
  deleteButtonImage: {
    width: 26,
    height: 26,
    tintColor: 'white'
  }
});

export default HeaderComponent;
