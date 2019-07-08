import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

let styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 0,
    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  cardHeader: {
    backgroundColor: '#DCDCDC',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardText: {
    color: 'white'
  },
  cardImage: {
    width: 280,
    height: 280
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
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardText}>USER ID</Text>
              </View>
              <Image
                style={styles.cardImage}
                source={{ uri: `${this.props.selectedTag.arTagUrl}` }}
              />
              <Text> Click to add artwork to wall</Text>
            </Card>
          </View>
        </TouchableHighlight>
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
