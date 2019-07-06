import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

let styles = StyleSheet.create({
  outer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
            }}
            source={require('./tagLogo.png')}
          />
        </View>
      </View>
    );
  }
}
