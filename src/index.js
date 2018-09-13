import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Layout from 'components/layout';
import ApplicationNavigator from 'navigation/containers';
import myStore from './store';

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
