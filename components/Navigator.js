/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import EntryARScene from './EntryARScene';
import Home from './Home';
import Draw from './Draw';
import NearByTags from './NearByTags'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Home />
      </View>
    );
  }
}
class ARScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <EntryARScene />
      </View>
    );
  }
}

class DrawScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Draw />
      </View>
    );
  }
}

class NearByTagsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NearByTags navigation={this.props.navigation} />
      </View>
    );
  }
}


const ARNavigator = createStackNavigator({
  NearByTags: NearByTagsScreen,
  EntryARScene: ARScreen,
})


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  NearByTags: ARNavigator,
  Draw: DrawScreen
});



export default createAppContainer(TabNavigator);
