import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { load as actionLoad, update as actionUpdate } from '../actions';
import SubscribedGrid from '../../../components/subscribed_grid';
import { ADD_TRACKER } from '../../../api/activity_tracker';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  componentDidMount() {
    console.log('@Home componentDidMount');
    const { load } = this.props;
    load();
  }

  // refreshToken = (subscribed) =>
  //   new Promise((resolve, reject) => {
  //     const tokenRefresh = subscribed.token.refreshToken;
  //     // 'oXGxq1dL1CPsimef-_OMKAW0zsjwrK5gY-4f3vuxj_lO1ShUKUQTNMzkta1FsRo0V31Yk_BjRfOtAXJTK89TPkb-Nt7wDYgmAZMgXEU-VQo';
  //     // '0gor3nYWaPQrWpRcxfPU9Z42LEH3b8QhsyiS5qugqwW1Ruvsd36hmcOBwtNv7AmCdtVfH1Z_tDHc1LiyTVMdXUb-Nt7wDYgmAZMgXEU-VQo';

  //     console.log(`@refreshToken actTracker = ${JSON.stringify(subscribed)}`);
  //     console.log(
  //       `https://datavatar.sytes.net/api/${subscribed.tracker.provider.toLowerCase()}/refresh`
  //     );
  //     console.log(
  //       `@refreshToken refreshToken : ${subscribed.token.refreshToken}`
  //     );
  //     let token;
  //     // let isAvailable = false;
  //     fetch(
  //       `https://datavatar.sytes.net/api/${subscribed.tracker.provider.toLowerCase()}/refresh`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           assertion: tokenRefresh
  //         }
  //       }
  //     )
  //       .then((response) => {
  //         const code = response.status;
  //         console.log(`Response refresh code : ${JSON.stringify(code)}`);
  //         if (code === 200) {
  //           response
  //             .json()
  //             .then((json) => {
  //               console.log(`Response JSON : ${JSON.stringify(json)}`);
  //               const { accessToken, refreshToken } = json.token;
  //               // TODO: on a besoin de l'ID. directement renvoye les info a dbhelper ou activity_tracker
  //               token = new Token({ accessToken, refreshToken });
  //               const actTrackerUpdate = {
  //                 provider: actTracker.provider,
  //                 token
  //               };
  //               console.log(
  //                 `@refreshToken actTrackerUpdate :${JSON.stringify(
  //                   actTrackerUpdate
  //                 )}`
  //               );
  //               resolve(actTrackerUpdate);
  //             })
  //             .catch((error) => reject(error));
  //         } else {
  //           token = new Token({});
  //           // TODO: mettre a jour le to
  //           console.log('Invalid Token, plz subscribe');
  //         }
  //       })
  //       .catch((error) => reject(error));
  //   });

  // getDataAsync = (actTracker) =>
  //   new Promise((resolve, reject) => {
  //     const { update } = this.props;
  //     const date = formatDate('Sun February 24,2019');
  //     const endDate = formatDate('Sun February 24,2019');
  //     // const date = 'today';
  //     // const endDate = 'today';
  //     const detailLvl = '1min';
  //     console.log(`actTracker ${JSON.stringify(actTracker)}`);
  //     console.log(
  //       `accessToken ${JSON.stringify(actTracker.token.accessToken)}`
  //     );
  //     const { accessToken } = actTracker.token;
  //     // const accessToken =
  //     //  'UMNkoDBWg1J2kIpWiqQmfuxfcNSe8EkTw8deih0wYrHNZXFIGWSDEWVktxMIa28F7vSHF47GreVxjsR-sDFT3kL7pNo1KazSGq_CGm48k1bMuGPXYsiUafNrca1f2PMEaba8LgCIMx87wAk-gerWSNsj3sXHGOId0kQFfud7yHe-TdX6d4EqiABjlOauOJf-XHlUos1OUHlZeB9fKu1zeYrb3U2kcSjrS9EthvlyWtCCsgQNuUXM1RXO_GuUB1QCuY_W33u0jzrN7PkgeOEVrpoWepLDIfn0fxMfDzk-wykU5UBAQVvy_7Qfc4oWkoJlrm4uj_RUiPhhYbkYMmc6cg';
  //     fetch(
  //       `https://datavatar.sytes.net/api/fitbit/protecteddata/hearthrate?date=${date}&end-date=${endDate}&detail-level=${detailLvl}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           assertion: accessToken
  //         }
  //       }
  //     )
  //       .then((response) => {
  //         const code = response.status;
  //         console.log(`Response code : ${JSON.stringify(code)}`);
  //         console.log(`Response : ${JSON.stringify(response)}`);
  //         response
  //           .json()
  //           .then((json) => {
  //             console.log(`Response JSON : ${JSON.stringify(json)}`);
  //             if (code === 401) {
  //               this.refreshToken(actTracker)
  //                 .then((actTrackerUpdate) => {
  //                   store
  //                     .updateActTrackerToken(actTrackerUpdate)
  //                     .then(() => {
  //                       4()
  //                         .then(() => resolve())
  //                         .catch((error) => reject(error));
  //                     })
  //                     .catch((error) => reject(error));
  //                   resolve(json);
  //                 })
  //                 .catch((error) => {
  //                   reject(error);
  //                 });
  //             } else {
  //               resolve(json);
  //             }
  //           })
  //           .catch((error) => reject(error));
  //         // getData()
  //         // if code == 200 je recupere la donnee recu (le token est a jour)
  //         // else if code == 401 {
  //         //                  refreshToken
  //         //                  if code == 200 update token et getData()
  //         //                  if code == 401 unvalid actTracker
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         reject(error);
  //       });
  //   });

  onPressItem = (item) => {
    console.log(`click on = ${JSON.stringify(item)}`);
    const { navigation } = this.props;
    if (item.tracker.id === ADD_TRACKER.id) {
      navigation.navigate('Subscribe');
    } else {
      // TODO: revoke token and remove subscribed
    }
  };

  setItemColor = (item) =>
    item.tracker.protocol !== 'subscribe' ? '#8be1b7' : '#c3ddd0';

  render() {
    const { lstSubscribedTrackers } = this.props;
    return (
      <View>
        <NavigationEvents
          onWillFocus={(payload) => {
            const { update } = this.props;
            update();
            console.log('@Home onWillFocus', payload);
          }}
          onDidFocus={(payload) => console.log('@Home onDidFocus', payload)}
          onWillBlur={(payload) => console.log('@Home onWillBlur', payload)}
          onDidBlur={(payload) => console.log('@Home onDidBlur', payload)}
        />
        <SubscribedGrid
          onPressItem={this.onPressItem}
          setItemColor={this.setItemColor}
          lstSubscribed={lstSubscribedTrackers}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  lstSubscribedTrackers: state.home.lstSubscribedTrackers
});

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(actionLoad()),
  update: () => dispatch(actionUpdate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
