/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View, SwitchNavigator } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags';
import Authentication from './Authentication';
import SignOut from './SignOut';
//let User;

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
});

const DrawNavigator = createStackNavigator({
  Draw: {
    screen: DrawScreen,
    navigationOptions: () => ({
      title: `Create`,
    }),
  },
});

const ARNavigator = createStackNavigator({
  NearByTags: NearByTagsScreen,
  EntryARScene: ARScreen,
});
const Logout = createBottomTabNavigator({
  logout: SignOut,
});
// const User = createStackNavigator({
//   Users: Authentication,
// });
// const login = async () => {
//   let userData = await AsyncStorage.getItem('id_token');
//   let data = JSON.parse(userData);
//   if (data.username && data.password) {
//     console.log('hi]]');
//     User = '';
//   }
// };
// login();

// export const createRootNavigator = (signedIn = false) => {
//   return SwitchNavigator({
//     SignedIn: {
//       screen: Authentication,
//     },
//     SignedOut: {
//       screen: SignOut,
//     },
//   });
// };
const User = createStackNavigator({
  Users: Authentication,
});
let TabNavigator = createBottomTabNavigator({
  Home: HomeNavigator,
  NearByTags: ARNavigator,
  Draw: DrawNavigator,
  Login: User,
});

export default createAppContainer(TabNavigator);
