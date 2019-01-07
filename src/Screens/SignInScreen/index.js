import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import FooterTabBar from './SignInFooterTabBar';
import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';


const TabNavigator = createBottomTabNavigator({
  SignIn: SignInTab,
  SignUp: SignUpTab,
}, {
  tabBarComponent: props => <FooterTabBar {...props} />
});

export default createAppContainer(TabNavigator);