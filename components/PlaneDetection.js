'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSelectedTag } from '../store/graffiti';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroARPlaneSelector,
  ViroImage
} from 'react-viro';

class PlaneDetection extends Component {
  render() {
    console.log(this.props.selectedTag);
    if (this.props.selectedTag) {
      //change this to selectedGraffiti
      return (
        <ViroARScene
          // onTrackingUpdated={() => {
          //   this.setState({ text: `CONGRATULATIONS LIOR <3 <3` });
          // }}
          anchorDetectionTypes={['PlanesVertical']} //['PlanesHorizontal', 'PlanesVertical'] props on VIROARPlaneSelector: alignment="Horizontal"
        >
          <ViroARPlaneSelector
            minHeight={0.2}
            minWidth={0.2}
            alignment='Vertical'
          >
            <ViroImage
              height={0.5}
              width={0.5}
              rotation={[-90, 0, 0]}
              source={{ uri: this.props.selectedTag.arTagUrl }}
            />
          </ViroARPlaneSelector>
          {/* <ViroImage
            height={0.5}
            width={0.5}
            rotation={[-90, 0, 0]}
            // placeholderSource={require('../res/monitor.jpg')}
            source={{ uri: this.props.myGraffiti[0].arTagUrl }}
          /> */}
        </ViroARScene>
      );
    } else {
      return (
        <ViroARScene>
          <ViroText
            text={'no artwork to view'}
            scale={[0.5, 0.5, 0]}
            position={[0, 0, -1]}
          />
        </ViroARScene>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedTag: state.graffiti.selectedTag
});

module.exports = connect(
  mapStateToProps,
  null
)(PlaneDetection);
