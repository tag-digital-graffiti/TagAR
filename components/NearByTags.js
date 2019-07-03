import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

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

  _toAR = () => {
    this.props.navigation.navigate('EntryARScene');
  };

  render() {
    const { history } = this.props;
    return (
      <View style={styles.outer}>
        <Text style={{ backgroundColor: '#ffff00' }}>
          TEST HOME PAGE GOES HERE
        </Text>
        <Button title='Go' onPress={this._toAR}></Button>
      </View>
    );
  }
}
