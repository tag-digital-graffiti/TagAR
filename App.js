import TabNavigator from './components/Navigator';
import SignUpNavigator from './components/SignUpNavigator';
import { AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      hasUser: false,
    };
  }
  async componentDidMount() {
    try {
      let userData = await AsyncStorage.getItem('id_token');
      let data = JSON.parse(userData);
      if (data.username && data.password) {
        console.log(data.username);
        this.setState({ hasUser: true });
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  render() {
    return (
      <Provider store={store}>
        {!this.state.hasUser ? <SignUpNavigator /> : <TabNavigator />}
      </Provider>
    );
  }
}
