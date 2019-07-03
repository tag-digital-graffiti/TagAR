import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { getNearbyGraffiti } from '../store/graffiti';
import { connect } from 'react-redux';

let styles = StyleSheet.create({
  outer: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default class NearbyTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceLat: 0,
      deviceLong: 0,
      initialLoading: false
    };
  }
  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            deviceLat: position.coords.latitude,
            deviceLong: position.coords.longitude,
            error: null
          },
          () => {
            this.props.getNearbyGraffiti(
              this.state.deviceLat,
              this.state.deviceLong
            );
          }
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log(this.state.deviceLat);

    this.setState({ initialLoading: true });
  }

  _toAR = () => {
    this.props.navigation.navigate('EntryARScene');
  };

  render() {
    const { history } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <Text style={{ backgroundColor: '#ffff00' }}>
            TEST HOME PAGE GOES HERE
          </Text>
          <Button title="Go" onPress={this._toAR} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  myGraffiti: state.graffiti.nearByTags
});

const mapDispatchToProps = dispatch => ({
  getNearbyGraffiti: (lat, long) => dispatch(getNearbyGraffiti(lat, long))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(NearbyTags);
