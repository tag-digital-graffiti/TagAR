/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import AntIcons from 'react-native-vector-icons/AntDesign';

import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags';
import UploadScreen from './Upload'

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Home`,
    }),
  }
})

const DrawNavigator = createStackNavigator({
  Add: {
    screen: UploadScreen,
    navigationOptions: () => ({
      title: `Add`,
    }),
  },
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
      title: `Select a Tag`,
    }),
  },
  EntryARScene: {
    screen: ARScreen,
    navigationOptions: () => ({
      title: `Find a Wall`,
    }),
  }
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Explore: ARNavigator,
  Add: {
    screen: DrawNavigator,
    navigationOptions: {
      tabBarLabel: "Add",
      tabBarIcon: () => (
        <AntIcons name="plus" size={30} />
      )
    },
  }
},
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: true
    }
  },
);


export default createAppContainer(TabNavigator);


