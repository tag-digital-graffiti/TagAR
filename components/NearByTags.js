import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { Card, CardItem } from 'react-native-elements';

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

  _toDetails = async id => {
    await this.props.getSelectedTag(id);
    this.props.navigation.navigate('SingleTagScreen');
  };

  render() {
    if (this.props.tags.length) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F0F0F0'
          }}
        >
          <Text>
            There are {this.props.tags.length} discoverable artworks nearby
          </Text>

          <FlatList
            data={this.props.tags}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  paddingHorizontal: 30
                }}
              >
                <TouchableHighlight onPress={() => this._toDetails(item.id)}>
                  <Card containerStyle={{ borderRadius: 10, padding: 0 }}>
                    <View
                      style={{
                        backgroundColor: 'grey',
                        padding: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                    >
                      <Text style={{ color: 'white' }}>USER ID</Text>
                    </View>
                    <Image
                      style={{
                        width: 280,
                        height: 280
                      }}
                      source={{ uri: `${item.arTagUrl}` }}
                    />
                  </Card>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={item => {
              return item.id;
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F0F0F0'
          }}
        />
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
