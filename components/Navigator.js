/* eslint-disable react/no-multi-comp */
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import AntIcons from 'react-native-vector-icons/AntDesign';
import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags'
import UploadScreen from './Upload'

const HomeNavigator = createStackNavigator({
  Home: HomeScreen
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
  NearByTags: NearByTagsScreen,
  EntryARScene: ARScreen,
})

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  NearByTags: ARNavigator,
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


