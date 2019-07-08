import React from 'react';
import { Text, View, SwitchNavigator } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import SignUp from './Authentication';
import HomeScreen from './Home';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
});

const User = createStackNavigator({
  Users: SignUp,
});

let TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  Login: User,
});

export default createAppContainer(TabNavigator);
