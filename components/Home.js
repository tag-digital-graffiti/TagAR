import React, { Component } from 'react';
<<<<<<< HEAD
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
=======
import { Text, View, StyleSheet, Image } from 'react-native';

>>>>>>> 5a1e8712cb7ab15f5616ce05583d3f131755ee25
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
<<<<<<< HEAD
          <Text style={{ backgroundColor: '#ffff00' }}>
            TEST HOME PAGE GOES HERE
          </Text>
=======
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#FFFFFF'
            }}
            source={require('./tagLogo.png')}
          />
>>>>>>> 5a1e8712cb7ab15f5616ce05583d3f131755ee25
        </View>
      </View>
    );
  }
}
