/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  StackActions,
  NavigationActions
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
import MapScreen from './Map';
import SingleTagScreen from './SingleTag';


const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Home`
    })
  }
});

const MapNavigator = createStackNavigator({
  Home: {
    screen: MapScreen,
    navigationOptions: () => ({
      title: `Map`
    })
  }
});

const DrawNavigator = createStackNavigator({
  Add: {
    screen: UploadScreen,
    navigationOptions: () => ({
      title: `Add`
    })
  },
  Draw: {
    screen: DrawScreen,
    navigationOptions: () => ({
      title: `Create`
    })
  }
});

const ARNavigator = createStackNavigator({
  NearByTags: {
    screen: NearByTagsScreen,
    navigationOptions: () => ({
      title: `Select a Tag`
    })
  },
  SingleTagScreen: {
    screen: SingleTagScreen,
    navigationOptions: () => ({
      title: `Tag Details`
    })
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
    Map: MapNavigator,
    Add: {
      screen: DrawNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: () => <AntIcons name='plus' size={30} />
      }
    }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation }) => {
        const nextRoute = navigation.state.routeName
        const previousRoute = navigation.state.routes[0].routeName

        navigation.dispatch(NavigationActions.navigate({ routeName: nextRoute }))

        navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: previousRoute }),
          ],
        }))
      }
    })
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

