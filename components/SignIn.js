import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';
import { auth } from '../store/user';
import { connect } from 'react-redux';

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
  },
  error: {
    color: '#A89898'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');

class SignIn extends Component {
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
      password: '',
      error: ''
    };
  }

  _handleLogIn = async event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    try {
      await this.props.auth(username, password);
      if (this.props.user.id) {
        await AsyncStorage.setItem('tagUserToken', this.props.user.id.toString());
        this.props.navigation.navigate('App');
      } else {
        this.setState({
          error: this.props.error
        })
      }
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
          />
        </View>
        <View><Text style={styles.error}>{this.state.error}</Text></View>
        <View style={styles.inputContainer}>
          <View style={styles.inputStyle}>
            <Input
              style={styles.input}
              placeholder='Username'
              placeholderTextColor='#A89898'
              leftIcon={{ type: 'antdesign', name: 'user', color: '#A89898' }}
              leftIconContainerStyle={{ paddingRight: 25 }}
              value={this.state.username}
              onChangeText={text => this.setState({ username: text, error: '' })}
            />
          </View>
          <View style={styles.inputStyle}>
            <Input
              style={styles.input}
              name='password'
              placeholder='Password'
              placeholderTextColor='#A89898'
              leftIcon={{ type: 'antdesign', name: 'lock', color: '#A89898' }}
              leftIconContainerStyle={{ paddingRight: 25 }}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text, error: '' })}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainerTop}>
          <Button
            textStyle={{
              fontSize: 12,
              fontWeight: 400
            }}
            title='Log in'
            buttonStyle={{
              width: WIDTH - 97,
              height: 40,
              backgroundColor: '#70C1B3'
            }}
            disabledStyle={{
              width: WIDTH - 97,
              height: 40,
              backgroundColor: '#27413D'
            }}
            raised={true}
            onPress={this._handleLogIn}
            disabled={!this.state.username || !this.state.password}
          />
        </View>
        <View style={{ height: 155 }} />
        <Divider
          style={{
            backgroundColor: '#e1e8ee',
            height: 1,
            width: '90%',
            marginBottom: 10
          }}
        />
        <View style={styles.footer}>
          <Text style={{ color: '#A89898' }}>Don't have an account? </Text>
          <Text
            style={{ color: '#A89898' }}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            Register Now!
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  auth: (username, password) => dispatch(auth(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
