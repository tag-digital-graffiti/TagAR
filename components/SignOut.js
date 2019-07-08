import React, { Component } from 'react';
import Home from './Home';
import { AsyncStorage, TouchableOpacity, Text } from 'react-native';

export default class SignOut extends Component {
  constructor() {
    super();
    this.state = {
      userLogout: false,
    };
    this.logout = this.logout.bind(this);
  }
  async logout(userToken) {
    try {
      await AsyncStorage.removeItem(userToken);
      this.setState({ userLogout: true });
      console.log('y');
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <TouchableOpacity>
        <Text onPress={() => this.logout('id_token')}>Sign Out</Text>
        {this.state.userLogout ? this.props.navigation.navigate('Home') : null}
      </TouchableOpacity>
    );
  }
}
