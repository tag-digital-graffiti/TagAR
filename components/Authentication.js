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
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
    };
  }

  async saveTime(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error:' + error.message);
    }
  }
  render() {
    _toNearByTags = () => {
      this.props.navigation.navigate('NearByTags');
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
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
