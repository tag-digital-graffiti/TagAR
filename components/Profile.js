import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { Card } from 'react-native-elements';
import { FlatGrid } from "react-native-super-grid"
import { getTagsByArtist } from '../store/graffiti'

const styles = StyleSheet.create({
  profileView: {
    backgroundColor: "rgb(244, 242, 244)",
    flex: 1,
  },
  headerView: {
    backgroundColor: "white",
    height: 250,
    marginTop: 60,
    alignItems: "center",
  },
  avatarTempImage: {
    backgroundColor: "transparent",
    resizeMode: "center",
    width: 124,
    height: 124,
    marginTop: 25,
  },
  drWhatText: {
    color: "rgb(4, 12, 22)",
    fontSize: 26,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    lineHeight: 32,
    backgroundColor: "transparent",
    marginTop: 11,
  },
  galleryView: {
    backgroundColor: "transparent",
    flex: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 20,
    marginBottom: 52,
    alignItems: "center",
  },
  latestPhotosText: {
    color: "black",
    fontFamily: ".AppleSystemUIFont",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    backgroundColor: "transparent",
    opacity: 0.4,
  },
  photosFlatList: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  photosFlatListViewWrapper: {
    alignSelf: "stretch",
    height: 180,
    marginTop: 13,
  },
  photosView: {
    backgroundColor: "transparent",
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  photosImage: {
    backgroundColor: "transparent",
    resizeMode: "center",
    width: 180,
    height: 180,
  },
})


class Profile extends Component {
  async componentDidMount() {
    await this.props.getTagsByArtist(this.props.user.id)
  }

  _logout = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth');
  }
  render() {
    const user = this.props.user;
    const latestWorks = this.props.artistTags.reverse();
    return (
      <View
        style={styles.profileView}>
        <View
          style={styles.headerView}>
          <Image
            source={{ uri: 'https://external-preview.redd.it/3mP_m1XCb2PEpXadWhFURkalTEWwjVO6M_jn5d_pNQ0.jpg?auto=webp&s=b4e62db7ee80fdcd860bef95154e6b738864222d' }}
            style={styles.avatarTempImage} />
          <Text
            style={styles.drWhatText}>{user.username}</Text>

          <View
            style={{
              flex: 1,
            }} />
          <Button style={styles.drWhatText} title="Logout" onPress={this._logout}></Button>

        </View>

        <View
          style={styles.galleryView}>
          <Text
            style={styles.latestPhotosText}>LATEST CONTENT</Text>
          <View
            style={styles.photosFlatListViewWrapper}>
            {this.props.artistTags[0] ? (<FlatGrid
              items={latestWorks}
              renderItem={({ item }) => (
                <View
                  style={styles.photosView}>
                  <Image
                    source={{ uri: item.arTagUrl }}
                    style={styles.photosImage} />
                </View>)}
              itemDimension={180}
              horizontal={true}
              spacing={10}
              style={styles.photosFlatList} />) :
              (<Text style={styles.drWhatText}>No User Created Content</Text>)}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser,
  artistTags: state.graffiti.artistTags
});

const mapDispatchToProps = dispatch => ({
  getTagsByArtist: userId => dispatch(getTagsByArtist(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
