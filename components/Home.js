import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <Text style={{ backgroundColor: '#ffff00' }}>
            TEST HOME PAGE GOES HERE
          </Text>
        </View>
      </View>
    );
  }
}
