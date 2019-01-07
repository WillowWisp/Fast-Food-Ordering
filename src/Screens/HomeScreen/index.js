import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import FooterTabBar from './HomeFooterTabBar';
import AppTab from './AppTab';
import SettingsTab from './SettingsTab';


const TabNavigator = createBottomTabNavigator({
  App: AppTab,
  Settings: SettingsTab,
}, {
  tabBarComponent: props => <FooterTabBar {...props} />
});

export default createAppContainer(TabNavigator);
