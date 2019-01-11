import React from 'react';
import { Easing, Animated } from 'react-native';
import { createDrawerNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

import SideBar from './SideBar/SideBar';
import HomeScreen from './Screens/HomeScreen/';
import FaqScreen from './Screens/FaqScreen/FaqScreen';
import SignInScreen from './Screens/SignInScreen/';
import FoodMenuScreen from './Screens/FoodMenuScreen/';
import FoodDetailScreen from './Screens/FoodMenuScreen/FoodDetailScreen/FoodDetailScreen';
import CartScreen from './Screens/CartScreen/CartScreen';
import CheckOutAddressScreen from './Screens/CheckOutScreens/CheckOutAddressScreen';
import CheckOutPaymentScreen from './Screens/CheckOutScreens/CheckOutPaymentScreen';
import CheckOutConfirmationScreen from './Screens/CheckOutScreens/CheckOutConfirmationScreen';
import LocationScreen from './Screens/LocationScreen/LocationScreen';

const MyDrawerNavigator = createDrawerNavigator({
  Home:  {
    screen: createStackNavigator({
      HomeScreen: HomeScreen,
      FoodMenu: FoodMenuScreen,
      FoodDetail: FoodDetailScreen,
      Cart: CartScreen,
      CheckOut: createStackNavigator({ //Create new navigator to apply special animation
        CheckOutAddress: CheckOutAddressScreen,
        CheckOutPayment: CheckOutPaymentScreen,
        CheckOutConfirmation: CheckOutConfirmationScreen,
      },
      {
        initialRouteName: 'CheckOutAddress',
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        },
        transitionConfig: () => ({
          transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
          },
          screenInterpolator: sceneProps => {
                    const {layout, position, scene} = sceneProps;
                    const {index} = scene;

                    const width = layout.initWidth;
                    const translateX = position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [width, 0, 0],
                    });

                    const opacity = position.interpolate({
                        inputRange: [index - 1, index - 0.99, index],
                        outputRange: [0, 1, 1],
                    });

                    return {opacity, transform: [{translateX: translateX}]};
                },
        })
      })
    },
    {
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
    }
  )},
  FAQ:  FaqScreen,
  Location: LocationScreen,
  SignIn: SignInScreen,
}, {
  contentComponent: (props) => <SideBar {...props} />,
  initialRouteName: "Home"
});

const MyApp = createAppContainer(MyDrawerNavigator);

export default MyApp;
