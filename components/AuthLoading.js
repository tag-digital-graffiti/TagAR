import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { setUser } from '../store/user';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      const userToken = await AsyncStorage.getItem('tagUserToken');
      if (userToken) {
        await this.props.setUser(parseInt(userToken));
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: userId => dispatch(setUser(userId)),
});

export default connect(
  null,
  mapDispatchToProps
)(AuthLoadingScreen);
