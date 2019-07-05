import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';

let { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default class Map extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}
