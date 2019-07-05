import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


let styles = StyleSheet.create({
  button: {
    marginBottom: 25
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default class Home extends Component {
  _toDraw = () => {
    this.props.navigation.navigate('Draw');
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Upload"
          type="outline"
          style={styles.button}
        />
        <Button
          title="Create"
          type="outline"
          onPress={this._toDraw}
        />
      </View>
    );
  }
}
