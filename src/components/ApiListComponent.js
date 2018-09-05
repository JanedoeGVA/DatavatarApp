import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import {
  updateOauth2AccessToken,
  deleteApi,
  queryAllApi,
  getApiId
} from '@databases/baseSchemas';
import { toTitleCase } from '@api/Utils';
import Swipeout from 'react-native-swipeout';
import realm from '@databases/baseSchemas';
import PopupDialogComponent from '@components/PopupDialogComponent';
import HeaderComponent from '@components/HeaderComponent';

let FlatListItem = (props) => {
  const {
    itemIndex,
    id,
    apiName,
    accessTokenKey,
    refreshTokenKey,
    isValide,
    popupDialogComponent,
    onPressItem
  } = props;

  getApiImage = () => {
    switch (apiName) {
      case 'fitbit':
        return require('@images/fitbit-logo.png');
      case 'nokia_health':
        return require('@images/nokia_health-logo.png');
      case 'garmin':
        return require('@images/garmin-logo.png');
      default:
        break;
    }
  };
  showEditModal = () => {
    popupDialogComponent.showDialogComponentForUpdate({
      id,
      name
    });
  };
  showDeleteConfirmation = () => {
    Alert.alert(
      'Delete',
      `Delete API ${toTitleCase(apiName)}`,
      [
        {
          text: 'No',
          onPress: () => {}, //Do nothing
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteApi(id)
              .then()
              .catch((error) => {
                alert(`failed to delete Api with id = ${id}, error=${error}`);
              });
          }
        }
      ],
      { cancelable: true }
    );
  };
  return (
    <Swipeout
      right={[
        {
          text: 'Edit',
          backgroundColor: 'rgb(81,134,237)',
          onPress: showEditModal
        },
        {
          text: 'Delete',
          backgroundColor: 'rgb(217, 80, 64)',
          onPress: showDeleteConfirmation
        }
      ]}
      autoClose={true}
    >
      <TouchableOpacity onPress={onPressItem}>
        <View
          style={{
            //backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue'
            backgroundColor: 'white',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image style={styles.image} source={getApiImage()} />
          <View
            style={{
              flex: 1,
              flexDirection: 'column'
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row'
              }}
            >
              <Text style={{ fontSize: 18, margin: 6 }} numberOfLines={2}>
                {`${id}.`}
              </Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 6 }}>
                {toTitleCase(apiName)}
              </Text>
            </View>

            <Text style={{ fontSize: 18, margin: 6 }} numberOfLines={2}>
              {`Access token : ${accessTokenKey}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

export default class ApiListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLists: []
    };
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  reloadData = () => {
    queryAllApi()
      .then((apiLists) => {
        this.setState({ apiLists });
      })
      .catch((error) => {
        this.setState({ apiLists: [] });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };

  getData = (item) => {
    this.getDataAsync(item).then((json) => {
      console.log(JSON.stringify(json));
      //check if valide
      let accessToken = json.oauthAccessTokenT;
      if (accessToken.isValide) {
        console.log(`is valide`);
        updateOauth2AccessToken(accessToken, item.id);
        //afficher Data
      } else {
        console.log(`is not valide`);
        alert('Access Token is not valid, deleting API');
        deleteApi(item.id);
      }
    });
  };

  getDataAsync = async (item) => {
    try {
      let response = await fetch(
        'https://datavatar.sytes.net/api/fitbit/protecteddata/profil',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item, [
            'apiName',
            'refreshTokenKey',
            'accessTokenKey',
            'isValide'
          ])
          /** Equivalent...
           * JSON.stringify({
              apiName: item.apiName,
              refreshTokenKey: item.refreshTokenKey,
              accessTokenKey: item.accessTokenKey,
              isValide: item.isValide
            }); */
        }
      );
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          title={'Api List'}
          hasDeleteAllButton={true}
          hasAddButton={true}
          showAddTodoList={() => {
            this.refs.popupDialogComponent.showDialogComponentForAdd();
          }}
        />
        <FlatList
          style={styles.flatList}
          data={this.state.apiLists}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item, index }) => (
            <FlatListItem
              {...item}
              itemIndex={index}
              popupDialogComponent={this.refs.popupDialogComponent}
              onPressItem={() => {
                console.log('item pressed');
                this.getData(item);
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()} //add .toString
        />
        <PopupDialogComponent ref={'popupDialogComponent'} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  flatList: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25
  }
});
