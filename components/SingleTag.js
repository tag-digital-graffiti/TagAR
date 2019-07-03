import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

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

export default class SingleTag extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 66, height: 58 }}
          source={{ uri: `${this.props.image}` }}
        />
      </View>
    );
  }
}
