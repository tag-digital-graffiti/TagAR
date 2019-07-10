/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';

import Entypo from 'react-native-vector-icons/Entypo'
import FW5 from 'react-native-vector-icons/FontAwesome5'

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
import ProfileScreen from './Profile'

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Home`,
      headerRight: (
        <Icon
          name="map-outline"
          type="material-community"
          color="#000000"
          onPress={() => navigation.navigate('Map')}
          size={30}
        />
      ),
    })

  },
  Map: {
    screen: MapScreen
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

const ProfileNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: `Profile`
    })
  }
});

const ARNavigator = createStackNavigator({
  NearByTags: {
    screen: NearByTagsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Select a Tag`,
      headerRight: (
        <Icon
          name="map-outline"
          type="material-community"
          color="#000000"
          onPress={() => navigation.navigate('Map')}
          size={30}
        />
      )
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
  Map: {
    screen: MapScreen
  }
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Entypo name='home' size={30} />
      }
    },
    Explore: {
      screen: ARNavigator,
      navigationOptions: {
        tabBarLabel: 'Nearby',
        tabBarIcon: () => <Entypo name='eye' size={30} />
      }
    },
    Add: {
      screen: DrawNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: () => <Entypo name='pencil' size={30} />
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: () => <FW5 name='user-alt' size={25} />
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
      },

      tabBarOptions: {
        showIcon: true,
        showLabel: false,
      },

    })
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: '#A89898',
      inactiveTintColor: '#262525'
    }
  }
);

const AuthNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      title: 'Log In'
    },
    initialRouteName: 'SignInScreen',
    headerMode: null
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      title: 'Register'
    }
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthNavigator
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
