import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage } from 'react-native';

let styles = StyleSheet.create({
  outer: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
    //this.getUser = this.getUser.bind(this);
  }
  async componentDidMount() {
    try {
      let userData = await AsyncStorage.getItem('id_token');
      let data = JSON.parse(userData);
      if (data.username && data.password) {
        console.log('cool');
        let username = data.username;
        this.setState({ username });
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <Image
            style={{
              width: 315,
              height: 315,
              borderRadius: 25,
              backgroundColor: '#FFFFFF',
            }}
            source={require('./tagLogo.png')}
          />
        </View>
        {this.state.username === null && !this.props.logOut ? null : (
          <Text>Welcome {this.state.username}</Text>
        )}
      </View>
    );
  }
}
