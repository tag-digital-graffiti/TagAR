import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll
} from 'react-native';
import axios from 'axios';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

export default class example extends Component {
  constructor() {
    super();
    this.state = {
      deviceLat: 0,
      deviceLong: 0,
      loaded: false
    }
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            deviceLat: position.coords.latitude,
            deviceLong: position.coords.longitude,
          }
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.setState({ loaded: true });
  }

  onSave = async (success, path) => {
    if (!success) return;
    const server = 'http://172.16.25.113:8080'
    const lat = this.state.deviceLat;
    const long = this.state.deviceLong;
    try {
      const image = await CameraRoll.getPhotos({ first: 1, assetType: "Photos", groupTypes: "All" })
      const imageUri = image.edges[0].node.image.uri
      console.log(image)
      const body = { lat, long, imageUri }
      try {
        await axios.post(`${server}/api/tags`, body)
      } catch (e) {
        console.error(e)
      }
    } catch (e) {
      console.error(e);
    }

  }
  render() {
    if (this.state.loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <RNSketchCanvas
              containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
              canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
              defaultStrokeIndex={0}
              defaultStrokeWidth={5}
              undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
              clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
              eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
              strokeComponent={color => (
                <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
              )}
              strokeSelectedComponent={(color, index, changed) => {
                return (
                  <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                )
              }}
              strokeWidthComponent={(w) => {
                return (<View style={styles.strokeWidthButton}>
                  <View style={{
                    backgroundColor: 'white', marginHorizontal: 2.5,
                    width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                  }} />
                </View>
                )
              }}
              saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
              savePreference={() => {
                return {
                  filename: null,
                  transparent: true,
                  imageType: 'png',
                }
              }}
              onSketchSaved={this.onSave}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
    backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
  }
});
