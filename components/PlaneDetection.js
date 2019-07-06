'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';


import {
  ViroARScene,
  ViroText,
  ViroARPlaneSelector,
  ViroImage,
  ViroARPlane
} from 'react-viro';

class PlaneDetection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: [1, 1, 0],
      position: [0, 0, 0],
      planeVisiblity: true,
      imageVisibility: false,
    }
    this._onPinch = this._onPinch.bind(this)
    this._onTap = this._onTap.bind(this)
    // this._onDrag = this._onDrag.bind(this)
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

  _onTap() {
    this.setState({
      planeVisibility: false,
      imageVisibility: true
    })
  }

  // _onDrag(dragToPos, source) {
  //   this.setState({
  //     position: [
  //       dragToPos[0],
  //       dragToPos[1],
  //       dragToPos[2]
  //     ]
  //   })

  // }

  render() {
    console.log(this.props.selectedTag);
    if (this.props.selectedTag) {
      //change this to selectedGraffiti
      return (
        <ViroARScene
          anchorDetectionTypes={['PlanesVertical']} //['PlanesHorizontal', 'PlanesVertical'] props on VIROARPlaneSelector: alignment="Horizontal"
        >
          <ViroARPlane
            minHeight={0.05}
            minWidth={0.05}
            alignment='Vertical'
            dragType="FixedToWorld"
            position={this.state.position}
          // onDrag={this._onDrag}
          >
            <ViroImage
              height={0.5}
              width={0.5}
              rotation={[-90, 0, 0]}
              source={require("../res/tap.png")}
              visible={this.state.planeVisibility}
              scale={[0.5, 0.5, 0]}
              opacity={0.5}
              onClick={this._onTap}
            />
            <ViroImage
              height={0.5}
              width={0.5}
              rotation={[-90, 0, 0]}
              source={{ uri: this.props.selectedTag.arTagUrl }}
              onPinch={this._onPinch}
              scale={this.state.scale}
              visible={this.state.imageVisibility}
            />
          </ViroARPlane>
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
