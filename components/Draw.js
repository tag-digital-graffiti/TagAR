import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import RNFetchBlob from 'react-native-fetch-blob';
import { getNearbyTags } from '../store/graffiti';
const { SERVER_URL } = require('../constants')


class Draw extends Component {
  constructor() {
    super();
    this.state = {
      deviceLat: 0,
      deviceLong: 0,
      loaded: false,
      error: null,
      color: null,
    };
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          deviceLat: position.coords.latitude,
          deviceLong: position.coords.longitude,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.setState({ loaded: true });
  }

  onSave = async (success, path) => {
    if (!success) return;
    //const server = 'http://172.16.25.113:8080';
    // const server = 'http://tag-sever-ar.herokuapp.com';

    const lat = this.state.deviceLat;
    const long = this.state.deviceLong;
    const tempPath = path;
    try {
      let base64 = await RNFetchBlob.fs.readFile(tempPath, 'base64');
      const imageData = `data:image/png;base64,${base64}`;
      const userId = this.props.user.id;
      const body = { lat, long, imageData, userId };
      try {
        await axios.post(`${SERVER_URL}/api/tags`, body);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }

    await this.props.getNearbyTags(this.state.deviceLat, this.state.deviceLong);
    this.currentCanvas.clear();
    this.props.navigation.navigate('Explore');
  };
  render() {
    if (this.state.loaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <RNSketchCanvas
              ref={ref => (this.currentCanvas = ref)}
              containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
              canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
              defaultStrokeIndex={0}
              defaultStrokeWidth={5}
              undoComponent={
                <View style={styles.functionButton}>
                  <Icon
                    raised
                    name="undo-variant"
                    type="material-community"
                    color="#39579A"
                  />
                </View>
              }
              clearComponent={
                <View style={styles.functionButton}>
                  <Icon raised name="clear" type="material" color="#39579A" />
                </View>
              }
              eraseComponent={
                <View style={styles.functionButton}>
                  <Icon
                    raised
                    name="eraser"
                    type="material-community"
                    color="#39579A"
                  />
                </View>
              }
              strokeComponent={color => (
                <View
                  style={[{ backgroundColor: color }, styles.strokeColorButton]}
                />
              )}
              strokeSelectedComponent={(color, index, changed) => {
                this.setState({ color: color });
                return (
                  <View
                    style={[
                      { backgroundColor: color, borderWidth: 2 },
                      styles.strokeColorButton,
                    ]}
                  />
                );
              }}
              strokeWidthComponent={w => {
                return (
                  <View style={styles.strokeWidthButton}>
                    <View
                      style={{
                        backgroundColor: `${this.state.color}`,
                        marginHorizontal: 1,
                        width: Math.sqrt(w / 3) * 10,
                        height: Math.sqrt(w / 3) * 10,
                        borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                      }}
                    />
                  </View>
                );
              }}
              saveComponent={
                <View style={styles.functionButton}>
                  <Icon
                    raised
                    name="content-save"
                    type="material-community"
                    color="#39579A"
                  />
                </View>
              }
              savePreference={() => {
                return {
                  filename: String(Math.ceil(Math.random() * 100000000)),
                  transparent: true,
                  imageType: 'png',
                };
              }}
              onSketchSaved={this.onSave}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Loading!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2,
    marginVertical: 8,
    width: 50,
    height: 50,
    borderRadius: 15,
    borderColor: '#E6ECF0',
    borderWidth: 1,
  },
  strokeWidthButton: {
    marginHorizontal: 1,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionButton: {
    marginHorizontal: 1,
    marginVertical: 8,
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

const mapStateToProps = state => ({
  user: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getNearbyTags: (lat, long) => dispatch(getNearbyTags(lat, long)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw);
