import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import Axios from 'axios';
import SignOut from './SignOut';
import Home from './Home';
let server = 'http://192.168.1.4:8080';

let styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 20,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      showFrom: false,
    };
    this.userSignup = this.userSignUp.bind(this);
  }
  async saveToken(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error:' + error.message);
    }
  }

  async userSignUp() {
    if (!this.state.username || !this.state.password) return undefined;
    console.log('hi');
    await Axios.post(`${server}/api/user`, this.state);
    this.saveToken('id_token', JSON.stringify(this.state));
    this.getToken();
    _toNavigator();
    this.setState({ username: '', password: '' });
  }
  async getToken() {
    try {
      let userData = await AsyncStorage.getItem('id_token');
      let data = JSON.parse(userData);
      if (data.username && data.password) {
        console.log(data.username);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  render() {
    _toNavigator = () => {
      this.props.navigation.navigate('Navigator');
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.inputContainer}>
          <TextInput
            editable={true}
            onChangeText={username => this.setState({ username })}
            placeholder="Username"
            ref="username"
            returnKeyType="next"
            style={styles.inputText}
            value={this.state.username}
            maxLength={20}
            onBlur={Keyboard.dismiss}
          />
          <TextInput
            editable={true}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            ref="password"
            returnKeyType="next"
            secureTextEntry={true}
            style={styles.inputText}
            value={this.state.password}
            maxLength={20}
            onBlur={Keyboard.dismiss}
          />
          <TouchableOpacity style={styles.inputContainer}>
            <Text onPress={() => this.userSignUp()}>Sign Up</Text>
            <SignOut />
          </TouchableOpacity>
          {this.state.username && this.state.password
            ? this.props.navigation.navigate('Navigator')
            : null}
        </View>
      </View>
    );
  }
}
