import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Input } from 'react-native-elements';
import { signUpUser } from '../store/user';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#262525',
    color: '#A89898'
  },

  inputContainer: {
    width: '80%',
    marginTop: 20
  },
  inputStyle: {
    marginTop: 10
  },
  logoImage: {
    width: 150,
    height: 150,
    opacity: 10
  },
  imageContainer: {
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 40,
    padding: 0
  },
  buttonContainer: {
    padding: 10
  },
  buttonContainerTop: {
    padding: 10,
    marginTop: 30
  }
});

const { width: WIDTH } = Dimensions.get('window');

class SignUp extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#262525'
    },
    headerTintColor: '#A89898'
  };

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
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
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logoImage}
            source={require('../public/taglogoUpdate2.png')}

            // source={require('../public/tagLogoUpdate.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputStyle}>
            <Input
              style={styles.input}
              placeholder='Username'
              placeholderTextColor='#A89898'
              leftIcon={{ type: 'antdesign', name: 'user' }}
              leftIconContainerStyle={{ paddingRight: 25 }}
              containerStyle={{ padding: 10 }}
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
              maxLength={20}
              onBlur={Keyboard.dismiss}
            />
          </View>
          <View style={styles.inputStyle}>
            <Input
              style={styles.input}
              name='password'
              placeholder='Password'
              placeholderTextColor='#A89898'
              leftIcon={{ type: 'antdesign', name: 'lock' }}
              leftIconContainerStyle={{ paddingRight: 25 }}
              containerStyle={{ padding: 10 }}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
              maxLength={20}
              onBlur={Keyboard.dismiss}
            />
          </View>
        </View>
        <View style={styles.buttonContainerTop}>
          <Button
            textStyle={{
              fontSize: 12,
              fontWeight: 400
            }}
            title='Register'
            buttonStyle={{
              width: WIDTH - 97,
              height: 40,
              backgroundColor: '#70C1B3'
            }}
            disabledStyle={{
              width: WIDTH - 97,
              padding: 15,
              backgroundColor: '#27413D'
            }}
            raised={true}
            onPress={this._signUp}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (username, password) => dispatch(signUpUser(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
