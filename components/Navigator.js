/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import AntIcons from 'react-native-vector-icons/AntDesign';

import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags';
import UploadScreen from './Upload';
import AuthLoadingScreen from './AuthLoading';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Home`,
    }),
  },
});

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
  },
});

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
  },
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Explore: ARNavigator,
    Add: {
      screen: DrawNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: () => <AntIcons name="plus" size={30} />,
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
    },
  }
);

const AuthNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: 'Sign In',
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
