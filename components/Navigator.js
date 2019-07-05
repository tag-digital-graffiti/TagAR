/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Home`,
    }),
  }
})

const DrawNavigator = createStackNavigator({
  Draw: {
    screen: DrawScreen,
    navigationOptions: () => ({
      title: `Create`,
    }),
  }
})

const ARNavigator = createStackNavigator({
  NearByTags: {
    screen: NearByTagsScreen,
    navigationOptions: () => ({
      title: `Nearby Tags`,
    }),
  },
  EntryARScene: {
    screen: ARScreen,
    navigationOptions: () => ({
      title: `Find a Vertical Plane`,
    }),
  }
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Explore: ARNavigator,
  Draw: DrawNavigator
});

export default createAppContainer(TabNavigator);
