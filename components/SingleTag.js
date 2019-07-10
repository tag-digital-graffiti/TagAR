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
  main: {
    backgroundColor: '#262525',
    padding: 25,
    height: '100%'
  },
  clickText: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  },
  cardContainer: {
    borderRadius: 10,
    padding: 0,
    shadowColor: '#A89898',
    shadowOffset: {
      width: 3,
      height: 4
    },
    // shadowRadius: 5,
    shadowOpacity: 1.0
  },
  cardHeader: {
    backgroundColor: '#81466a',
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
      <View style={styles.main}>
        <TouchableHighlight onPress={() => this._toAR()}>
          <View>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardText}>
                  Artist: {this.props.selectedTag.user.username}
                </Text>
              </View>
              <Image
                style={styles.cardImage}
                source={{ uri: `${this.props.selectedTag.arTagUrl}` }}
              />
            </Card>
            <View style={styles.clickText}>
              <Text style={{color: '#A89898'}}> Click tag to add to wall</Text>
            </View>
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
