import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import { getAllTags } from '../store/graffiti';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default class GoogleMap extends Component {
  componentDidMount() {
    this.props.getAllTags()
  }

  render() {
    if (this.props.allTags.length) {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 40.7049444,
              longitude: -74.0091773,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {this.props.allTags.map(marker => {
              return (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.lat,
                    longitude: marker.long,
                  }}
                >
                  <View style={{ borderRadius: 50, overflow: "hidden", borderWidth: 0.5, borderColor: "#b2b2b2" }}>
                    <Image source={{ url: marker.arTagUrl }} style={{ height: 25, width: 25 }} />
                  </View>
                </Marker>
              )
            })}
          </MapView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 40.7049444,
              longitude: -74.0091773,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  allTags: state.graffiti.allTags
});

const mapDispatchToProps = dispatch => ({
  getAllTags: () => dispatch(getAllTags())
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMap);
