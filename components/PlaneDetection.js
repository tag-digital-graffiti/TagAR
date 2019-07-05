'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  ViroARScene,
  ViroText,
  ViroARPlaneSelector,
  ViroImage
} from 'react-viro';

class PlaneDetection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: [1, 1, 0]
    }
    this._onPinch = this._onPinch.bind(this)
  }

  _onPinch(pinchState, scaleFactor, source) {
    if (pinchState == 3) {
      this.setState({
        scale: [
          this.state.scale[0] * scaleFactor,
          this.state.scale[1] * scaleFactor,
          this.state.scale[2] * scaleFactor,
        ],
      });
    }
  }
  render() {
    console.log(this.props.selectedTag);
    if (this.props.selectedTag) {
      //change this to selectedGraffiti
      return (
        <ViroARScene
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
              onPinch={this._onPinch}
              scale={this.state.scale}
            />
          </ViroARPlaneSelector>
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
