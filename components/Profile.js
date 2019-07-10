import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { getTagsByArtist } from '../store/graffiti';

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: '#262525',
    flex: 1
  },
  headerView: {
    backgroundColor: '#262525',
    height: 250,
    marginTop: 60,
    alignItems: 'center'
  },
  avatarTempImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 124,
    height: 124,
    marginTop: 25
  },
  drWhatText: {
    color: '#A89898',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    lineHeight: 32,
    backgroundColor: 'transparent',
    marginTop: 11
  },
  galleryView: {
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 20,
    marginBottom: 52,
    alignItems: 'center'
  },
  latestPhotosText: {
    color: '#FFFFFF',
    fontFamily: '.AppleSystemUIFont',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'left',
    // backgroundColor: 'transparent',
    opacity: 0.7
  },
  photosFlatList: {
    // backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  photosFlatListViewWrapper: {
    alignSelf: 'stretch',
    height: 180,
    marginTop: 13
  },
  photosView: {
    backgroundColor: 'transparent',
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  photosImage: {
    backgroundColor: 'transparent',
    resizeMode: 'center',
    width: 180,
    height: 180
  }
});

class Profile extends Component {
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#262525'
      },
      headerTintColor: '#A89898',
      headerRight: (
        <Button
          onPress={navigation.getParam('logout')}
          title="Logout"
          color="#A89898"
          fontWeight="bold"
        />
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout });
    await this.props.getTagsByArtist(this.props.user.id);
  }

  render() {
    const user = this.props.user;
    const latestWorks = this.props.artistTags.reverse();
    return (
      <View style={styles.profileView}>
        <View style={styles.headerView}>
          <Image
            source={require('../public/user-placeholder.png')}
            style={styles.avatarTempImage}
          />
          <Text style={styles.drWhatText}>{user.username}</Text>
        </View>

        <View style={styles.galleryView}>
          <Text style={styles.latestPhotosText}>LATEST CONTENT</Text>
          <View style={styles.photosFlatListViewWrapper}>
            {this.props.artistTags[0] ? (
              <FlatGrid
                items={latestWorks}
                renderItem={({ item }) => (
                  <View style={styles.photosView}>
                    <Image
                      source={{ uri: item.arTagUrl }}
                      style={styles.photosImage}
                    />
                  </View>
                )}
                itemDimension={180}
                horizontal={true}
                spacing={10}
                style={styles.photosFlatList}
              />
            ) : (
              <Text style={styles.drWhatText}>No User Created Content</Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  artistTags: state.graffiti.artistTags
});

const mapDispatchToProps = dispatch => ({
  getTagsByArtist: userId => dispatch(getTagsByArtist(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
