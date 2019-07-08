import React, { Component } from 'react';
import { View, Text, AsyncStorage, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Input } from 'react-native-elements';
import { signUpUser } from '../store/user';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  _signUp = async event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    try {
      await this.props.signUpUser(username, password);

      await AsyncStorage.setItem('tagUserToken', this.props.user.id.toString());
      this.props.navigation.navigate('App');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 100,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <Input
          placeholder="Username"
          leftIcon={{ type: 'antdesign', name: 'user' }}
          leftIconContainerStyle={{ paddingRight: 25 }}
          containerStyle={{ padding: 10 }}
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          maxLength={20}
          onBlur={Keyboard.dismiss}
        />
        <Input
          name="password"
          placeholder="Password"
          leftIcon={{ type: 'antdesign', name: 'lock' }}
          leftIconContainerStyle={{ paddingRight: 25 }}
          containerStyle={{ padding: 10 }}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry
          maxLength={20}
          onBlur={Keyboard.dismiss}
        />

        <Button
          title="Register"
          buttonStyle={{ backgroundColor: 'grey' }}
          containerStyle={{ paddingTop: 30 }}
          onPress={this._signUp}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (username, password) => dispatch(signUpUser(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
