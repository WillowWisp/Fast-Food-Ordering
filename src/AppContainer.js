import React from 'react';
import { createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/';
import FaqScreen from './Screens/FaqScreen/FaqScreen';
import SignInScreen from './Screens/SignInScreen/';
import FoodMenuScreen from './Screens/FoodMenuScreen/';
import FoodDetailScreen from './Screens/FoodMenuScreen/FoodDetailScreen/FoodDetailScreen';
import CartScreen from './Screens/CartScreen/CartScreen';

const MyDrawerNavigator = createDrawerNavigator({
  Home:  {
    screen: createStackNavigator({
      HomeScreen: HomeScreen,
      FoodMenu: FoodMenuScreen,
      FoodDetail: FoodDetailScreen,
      Cart: CartScreen,
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
  )},
  FAQ:  FaqScreen,
  SignIn: SignInScreen,
}, {
  contentComponent: (props) => <SideBar {...props} />,
  initialRouteName: "Home"
});

const MyApp = createAppContainer(MyDrawerNavigator);

export default MyApp;
