import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { connect } from 'react-redux';

let styles = StyleSheet.create({
  button: {
    marginBottom: 25
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      deviceLat: 0,
      deviceLong: 0,
      imageData: ''
    };
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          deviceLat: position.coords.latitude,
          deviceLong: position.coords.longitude
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  _toDraw = () => {
    this.props.navigation.navigate('Draw');
  };

  _upLoad = async () => {
    const options = {
      title: 'Select A Tag'
    };
    ImagePicker.launchImageLibrary(options, async response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = 'data:image/jpeg;base64,' + response.data;

        this.setState({
          imageData: source
        });

        const server = 'http://172.16.26.173:8080';
        const lat = this.state.deviceLat;
        const long = this.state.deviceLong;
        const imageData = this.state.imageData;
        const userId = this.props.user.id;

        const body = { lat, long, imageData, userId };
        await axios.post(`${server}/api/tags`, body);

        this.props.navigation.navigate('Home');
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title='Upload'
          type='outline'
          style={styles.button}
          onPress={this._upLoad}
        />
        <Button title='Create' type='outline' onPress={this._toDraw} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Upload);
