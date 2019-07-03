import React, { Component } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { View } from 'react-native'
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: '40506D80-B1B9-4AB5-837E-38B7645B5E92'
};

var InitialARScene = require('./PlaneDetection');

export default class EntryARScene extends Component {
  constructor() {
    super();
    this.state = {
      sharedProps: sharedProps
    };
  }

  render() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    );
  }
}

module.exports = EntryARScene;
