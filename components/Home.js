import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Modal,
  AsyncStorage
} from 'react-native';

let styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262525'
  },
  logoutButton: {
    color: '#A89898'
  },
  imageContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  modalInnerContainer: {
    marginTop: 40,

    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 80,
    backgroundColor: '#262525'
  },
  modalText: {
    textAlign: 'center',
    // justifyContent: 'center',
    // padding: 10,
    color: '#A89898',
    width: 225,
    fontSize: 16
  },
  modalView: {
    alignContent: 'center'
  }
});

export default class Home extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#262525'
    },
    headerTintColor: '#A89898'
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true
    };
    this._closeModal = this._closeModal.bind(this);
  }

  _closeModal = () => {
    setTimeout(() => {
      this.setState({ modalVisible: false });
    }, 5000);
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.modalView}>
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
                Create your own tag or explore nearby ones using the icons
                below!
              </Text>
            </View>
          </Modal>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#262525'
            }}
            source={require('../public/taglogoUpdate2.png')}
          />
        </View>
      </View>
    );
  }
}
