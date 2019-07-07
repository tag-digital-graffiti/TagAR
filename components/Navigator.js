/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
  BottomTabBar,
  NavigationActions,
  StackActions
} from 'react-navigation';
import ARScreen from './EntryARScene';
import HomeScreen from './Home';
import DrawScreen from './Draw';
import NearByTagsScreen from './NearByTags';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen
});

const DrawNavigator = createStackNavigator({
  Draw: {
    screen: DrawScreen,
    navigationOptions: () => ({
      title: `Create`
    })
  }
});

const ARNavigator = createStackNavigator({
  NearByTags: NearByTagsScreen,
  EntryARScene: ARScreen
});
const TabBarComponent = props => <BottomTabBar {...props} />;

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })]
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    NearByTags: ARNavigator,
    Draw: DrawNavigator
  },
  {
    tabBarOptions: {
      activeTintColor: 'orange'
    }
  }
  // {
  //   tabBarComponent: ({ ...props }) => (
  //     <TabBarComponent
  //       {...props}
  //       // onPress={() => {
  //       //   props.navigation.dispatch(resetAction);
  //       // }}
  //     />
  //   )
  // }
);

export default createAppContainer(TabNavigator);
