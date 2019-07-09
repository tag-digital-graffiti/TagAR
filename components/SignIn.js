import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Card, Button, Input } from 'react-native-elements';
import { auth } from '../store/user';
import { connect } from 'react-redux';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  _handleLogIn = async event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    try {
      await this.props.auth(username, password);
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
          marginRight: 30
        }}
      >
        <Input
          placeholder='Username'
          leftIcon={{ type: 'antdesign', name: 'user' }}
          leftIconContainerStyle={{ paddingRight: 25 }}
          containerStyle={{ padding: 10 }}
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
        />
        <Input
          name='password'
          placeholder='Password'
          leftIcon={{ type: 'antdesign', name: 'lock' }}
          leftIconContainerStyle={{ paddingRight: 25 }}
          containerStyle={{ padding: 10 }}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
        />

        <Button
          title='Sign In'
          buttonStyle={{ backgroundColor: 'black' }}
          containerStyle={{ paddingTop: 50 }}
          onPress={this._handleLogIn}
          disabled={!this.state.username || !this.state.password}
        />

        <Button
          title='Sign Up'
          buttonStyle={{ backgroundColor: 'grey' }}
          containerStyle={{ paddingTop: 30 }}
          onPress={() => this.props.navigation.navigate('SignUp')}
          // disabled={!this.state.username || !this.state.password}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  auth: (username, password) => dispatch(auth(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
