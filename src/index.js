import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import Layout from 'components/layout';
import ApplicationNavigator from 'navigation/containers';
import myStore from './store';

/*YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule'
]);*/

export default class MyApp extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <Layout>
          <ApplicationNavigator />
        </Layout>
      </Provider>
    );
  }
}
