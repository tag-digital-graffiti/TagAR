/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createNavigator,
} from 'react-navigation';
import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags';
import Authentication from './Authentication';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
});

const DrawNavigator = createStackNavigator({
  Draw: DrawScreen,
});

const ARNavigator = createStackNavigator({
  NearByTags: NearByTagsScreen,
  EntryARScene: ARScreen,
});

const Login = createStackNavigator({
  Authentication: Authentication,
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  NearByTags: ARNavigator,
  Draw: DrawNavigator,
  Login: Authentication,
});

export default createAppContainer(TabNavigator);
