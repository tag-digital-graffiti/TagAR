import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, AsyncStorage } from 'react-native';

let styles = StyleSheet.create({
  outer: {
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
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#FFFFFF'
            }}
            source={require('./tagLogo.png')}
          />
          <Button title="Logout" onPress={this._logout}></Button>
        </View>
      </View>
    );
  }
}
