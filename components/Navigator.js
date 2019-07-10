/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  StackActions,
  NavigationActions
} from 'react-navigation';

import Entypo from 'react-native-vector-icons/Entypo';
import FW5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

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
import ProfileScreen from './Profile';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Home`,
      headerRight: (
        <Icon
          name="globe"
          type="font-awesome"
          color="#A89898"
          onPress={() => navigation.navigate('Map')}
          size={22}
          iconStyle={{
            paddingRight: 27
          }}
        />
      )
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
          name="globe"
          type="font-awesome"
          color="#A89898"
          onPress={() => navigation.navigate('Map')}
          size={22}
          iconStyle={{
            paddingRight: 27
          }}
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
      title: `Find a Wall`
    })
  },
  Map: {
    screen: MapScreen
  }
});

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={'home'}
            type={'font-awesome'}
          />
        ),
        barStyle: { backgroundColor: '#BE5941' }
      }
    },
    Explore: {
      screen: ARNavigator,
      navigationOptions: {
        tabBarLabel: 'Nearby',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={'eye'}
            type={'entypo'}
          />
        ),
        barStyle: { backgroundColor: '#88A25D' }
      }
    },
    Add: {
      screen: DrawNavigator,
      navigationOptions: {
        tabBarLabel: 'Add',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={'pencil'}
            type={'entypo'}
          />
        ),
        barStyle: { backgroundColor: '#775DA2' }
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={'user'}
            type={'font-awesome'}
          />
        ),
        barStyle: { backgroundColor: '#5DA29A' }
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation }) => {
        const nextRoute = navigation.state.routeName;
        const previousRoute = navigation.state.routes[0].routeName;

        navigation.dispatch(
          NavigationActions.navigate({ routeName: nextRoute })
        );

        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: previousRoute })]
          })
        );
      }

      // tabBarOptions: {
      //   showIcon: true,
      //   showLabel: false
      //   // activeTintColor: '#A89898',
      //   // inactiveTintColor: '#262525'
      // }
    })
  }
  // {
  //   tabBarOptions: {
  //     showIcon: true,
  //     showLabel: true
  //     // activeTintColor: '#A89898',
  //     // inactiveTintColor: '#262525'
  //   }
  // }
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
