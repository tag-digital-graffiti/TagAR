import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  AsyncStorage
} from 'react-native';

let styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262525',
  },
  imageContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default class Home extends Component {
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#FFFFFF'
            }}
            source={require('./tagLogo.png')}
          />
          <Button title="Logout" onPress={this._logout} />
        </View>
      </View>
    );
  }
}
