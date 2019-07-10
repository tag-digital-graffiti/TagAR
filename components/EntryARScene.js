import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

var sharedProps = {
  apiKey: '40506D80-B1B9-4AB5-837E-38B7645B5E92'
};

var InitialARScene = require('./PlaneDetection');

export default class EntryARScene extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps,
      visible: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: false
      })
    }, 8000)
  }

  render() {
    return (
      <View style={styles.outer}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        {this.state.visible && (<View style={styles.instructions}>
          <Text>Tip: Find a wall and hold still</Text>
        </View>)}

      </View>
    );
  }
}
const styles = StyleSheet.create({
  outer: {
    flex: 1
  },
  instructions: {
    flex: 1,
    alignSelf: "center",
    position: "absolute",
    top: 20,
    backgroundColor: '#ffffff',
    alignContent: "center"
  }
})

module.exports = EntryARScene;
