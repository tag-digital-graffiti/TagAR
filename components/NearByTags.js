import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Modal
} from 'react-native';
import { Card } from 'react-native-elements';
import { getNearbyTags, getSelectedTag } from '../store/graffiti';
import { connect } from 'react-redux';

export default class NearbyTags extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#262525'
    },
    headerTintColor: '#A89898'
  };
  constructor(props) {
    super(props);

    this.state = {
      deviceLat: 0,
      deviceLong: 0,
      loaded: false,
      modalVisible: true
    };
    this._closeModal = this._closeModal.bind(this);
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

  _closeModal = () => {
    setTimeout(() => {
      this.setState({ modalVisible: false });
    }, 200);
  };

  render() {
    if (this.props.tags.length) {
      return (
        <View style={styles.main}>
          <Modal
            animationType="fade"
            backdropOpacity={0.1}
            transparent={true}
            visible={this.state.modalVisible}
            onShow={this._closeModal}
            borderRadius={10}
          >
            <View style={styles.modalInnerContainer}>
              <Text style={styles.modalText}>
                There are {this.props.tags.length} discoverable artworks nearby
              </Text>
            </View>
          </Modal>

          <FlatList
            data={this.props.tags}
            renderItem={({ item }) => (
              <View style={styles.flatListContainer}>
                <TouchableHighlight onPress={() => this._toDetails(item.id)}>
                  <Card containerStyle={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardText}>
                        Artist: {item.user.username}
                      </Text>
                    </View>
                    <Image
                      style={styles.cardImage}
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
      return <View style={styles.basicBacground} />;
    }
  }
}

let styles = StyleSheet.create({
  main: {
    backgroundColor: '#262525',
    flex: 1
  },
  modalInnerContainer: {
    marginTop: 26,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
    height: 80,
    backgroundColor: '#262525'
  },
  modalText: {
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    color: '#A89898',
    width: 225,
    fontSize: 16
  },
  flatListContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 30
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
    borderTopRightRadius: 10,
  },
  cardText: {
    color: 'white'
  },
  cardImage: {
    width: 280,
    height: 280
  },
  basicBacground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0'
  }
});

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
