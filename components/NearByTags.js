import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { getNearbyTags, getSelectedTag } from '../store/graffiti';
import { connect } from 'react-redux';
import SingleTag from './SingleTag';

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
      loaded: false
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
            this.props.getNearbyTags(
              this.state.deviceLat,
              this.state.deviceLong
            );
          }
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.setState({ loaded: true });
  }
  _toAR = id => {
    this.props.getSelectedTag(id);
    this.props.navigation.navigate('EntryARScene');
  };
  render() {
    if (this.props.tags.length) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <FlatList
            data={this.props.tags}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 25,
                  backgroundColor: '#F0F0F0'
                }}
              >
                <TouchableHighlight onPress={() => this._toAR(item.id)}>
                  <View>
                    <Image
                      style={{
                        width: 280,
                        height: 280,
                        borderRadius: 25,
                        backgroundColor: '#FFFFFF'
                      }}
                      source={{ uri: `${item.arTagUrl}` }}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={item => {
              return item.id;
            }}
            style={{ flex: 1, marginTop: 20 }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>No Local Images</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  tags: state.graffiti.nearByTags
});

const mapDispatchToProps = dispatch => ({
  getNearbyTags: (lat, long) => dispatch(getNearbyTags(lat, long)),
  getSelectedTag: id => dispatch(getSelectedTag(id))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(NearbyTags);
