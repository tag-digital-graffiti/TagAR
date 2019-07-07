import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
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

export default class SingleTag extends Component {
  constructor(props) {
    super(props);
  }

  _toAR = () => {
    this.props.navigation.navigate('EntryARScene');
  };

  render() {
    return (
      <View
        style={{
          padding: 25
        }}
      >
        <TouchableHighlight onPress={() => this._toAR()}>
          <View>
            <Image
              style={{
                width: 300,
                height: 300,
                borderRadius: 25
              }}
              source={{ uri: `${this.props.selectedTag.arTagUrl}` }}
            />
          </View>
        </TouchableHighlight>
        <Text> Click to add artwork to wall</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  selectedTag: state.graffiti.selectedTag
});

module.exports = connect(
  mapStateToProps,
  null
)(SingleTag);
