import React from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/';
import FaqScreen from './Screens/FaqScreen/FaqScreen';
import FoodMenuScreen from './Screens/FoodMenuScreen/';
import SignInScreen from './Screens/SignInScreen/';

const MyDrawerNavigator = createDrawerNavigator({
  Home:  HomeScreen,
  FAQ:  FaqScreen,
  FoodMenu: FoodMenuScreen,
  SignIn: SignInScreen,
}, {
  contentComponent: (props) => <SideBar {...props} />,
  initialRouteName: "Home"
});

const MyApp = createAppContainer(MyDrawerNavigator);

export default MyApp;
