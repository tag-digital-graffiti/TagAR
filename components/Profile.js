import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { Card } from 'react-native-elements';


let styles = StyleSheet.create({
  outer: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  },
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

class Profile extends Component {
  _logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth');
  }

  render() {
    const user = this.props.user;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.outer}>
          <View>
            <Card containerStyle={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardText}>{user.username}</Text>
              </View>
              <Image
                style={styles.cardImage}
                source={{ uri: 'https://external-preview.redd.it/3mP_m1XCb2PEpXadWhFURkalTEWwjVO6M_jn5d_pNQ0.jpg?auto=webp&s=b4e62db7ee80fdcd860bef95154e6b738864222d' }}
              />
              <Button title="Logout" onPress={this._logout}></Button>
            </Card>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Profile);
