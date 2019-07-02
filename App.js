import TabNavigator from './components/Navigator';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    );
  }
}
