import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, StyleProvider, Toast, Badge } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Address from '../../AppData/Address'
import Food from '../../AppData/Food'
import Order from '../../AppData/Order';
import Cart from '../../AppData/Cart';

class AppTab extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      badgeText: user.cart.FoodList.length,
    };

    // user.addNewAddress(new Address('Nguyễn Đình Phú Thịnh',
    //                                 '0787774666',
    //                                 'Hồ Chí Minh',
    //                                 'Ký túc xá Khu A ĐHQG Tp.HCM - Khu Phố 6, Phường Linh Trung, Quận Thủ Đức'));
    // user.addNewAddress(new Address('Vladimir Putin',
    //                                 '0123456789',
    //                                 'Russia',
    //                                 'Vodka Cyka Blyat'));
    // user.cart.addFood(new Food(0, 'Ramen Burger',
    //                           'https://c8.alamy.com/comp/HGB7R0/new-fast-food-ramen-burger-close-up-on-a-paper-on-the-wooden-table-HGB7R0.jpg',
    //                           '50.000 VNĐ', '420g', 'burger'), 2);
    // user.cart.addFood(new Food(1, 'Rustic Sandwich',
    //                           'https://c8.alamy.com/comp/HFHJHT/rustic-sandwich-with-beefsteak-fried-egg-and-french-fries-vertical-HFHJHT.jpg',
    //                           '40.000 VNĐ', '420g', 'other'), 1);


  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        user.uid = currentUser.uid;
        
        this.fetchAndLoadAddressList();
        this.fetchAndLoadOrderList();
        this.fetchAndLoadCart();

      } else {
        user.uid = '';
        user.addressList = [];
        user.orderList = [];
        user.cart.FoodList = [];
        user.defaultAddressId = -1;
      }
    });

    
    firebase.database().ref('places/')
      .on('value', (snapshot) => {
        const fetchedPlaces = snapshot.val();
        globalPlaces = fetchedPlaces;
      });
  }


  fetchAndLoadAddressList = () => {
    user.addressList = [];

    firebase.database().ref(`users/${user.uid}/addressList`)
      .once('value', snapshot => {
        if (snapshot.val()) {
          this.loadUsersAddressList(snapshot);
        }
      });
    
    firebase.database().ref(`users/${user.uid}/defaultAddressId`)
      .on('value', snapshot => {
        if (snapshot.val() !== undefined) {
          user.defaultAddressId = snapshot.val();
        }
      });
  }

  loadUsersAddressList = (snapshot) => {
    Object.keys(snapshot.val()).map((key) => {
      const fetchedAddress = {...snapshot.val()[key]};
      user.addNewAddress(new Address(fetchedAddress.name, fetchedAddress.phoneNumber, fetchedAddress.city, fetchedAddress.detailAddress, key));
    });
  }

  fetchAndLoadOrderList = () => {
    user.orderList = [];

    firebase.database().ref(`users/${user.uid}/orderList`)
      .once('value', snapshot => {
        if (snapshot.val()) {
          this.loadUsersOrderList(snapshot);
        }
      });
  }

  loadUsersOrderList = (snapshot) => {
    snapshot.val().forEach((order) => {
      const newFoodList = [];
      order.cart.FoodList.forEach((item, index) => {
        const { id, title, poster, price, weight, type, ingredients, placeId } = item.food;
        const newFood = new Food(id, title, poster, price, weight, type, ingredients, placeId);
        newFoodList.push({food: newFood, amount: item.amount});
      });
      const newCart = new Cart(newFoodList);
      const newAddress = new Address(order.address.name, order.address.phoneNumber, order.address.city, order.address.detailAddress, order.address.firebaseID)
      const newOrder = new Order(order.id, order.date, order.status, newAddress, order.deliveryMethod, order.paymentMethod, newCart)
      user.addNewOrder(newOrder);
    });
  }

  fetchAndLoadCart = () => {
    user.orderList = [];

    firebase.database().ref(`users/${user.uid}/cart/FoodList`)
      .once('value', snapshot => {
        if (snapshot.val()) {
          this.loadUsersCart(snapshot);
        }
      });
  }

  loadUsersCart = (snapshot) => {
    const fetchedData = snapshot.val();

    const newFoodList = [];
    Object.keys(fetchedData).forEach((key) => {
      const { id, title, poster, price, weight, type, ingredients, placeId } = fetchedData[key].food;
      const newFood = new Food(id, title, poster, price, weight, type, ingredients, placeId);
      newFoodList.push({ food: newFood, amount: fetchedData[key].amount });
    });

    const newCart = new Cart(newFoodList);

    user.cart = newCart;
  }

  changeBadgeText = () => {
    const num = user.cart.FoodList.length;
    if (num > 9) {
      this.setState({ badgeText: "*" });
    }
    else {
      this.setState({ badgeText: num.toString() });
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(customizedTheme)}>
        <Container>
          <Header style={{ height: 70, justifyContent: 'center', alignItems: 'center' }}>
            <Left>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title style={{fontFamily: 'VarelaRound'}}>Trang chủ</Title>
            </Body>
            <Right>
              <TouchableOpacity
                style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}
                onPress={() => this.props.navigation.navigate('Cart')}
              >
                <Icon
                  name='md-cart'
                  style={{ color: "white", marginRight: 10, marginTop: 10 }}
                />
                <NavigationEvents
                  onWillFocus={this.changeBadgeText}
                />
                <Badge
                  style={{ backgroundColor: '#2372F5', alignSelf: 'flex-end', position: 'absolute', scaleX: 0.8, scaleY: 0.8}}
                >
                  <Text>{this.state.badgeText}</Text>
                </Badge>
              </TouchableOpacity>
            </Right>
          </Header>
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => this.props.navigation.navigate('FoodMenu', { activeTab: 'burger' })}
              >
                <Image
                  source={require('../../Img/hamburger.jpg')}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Hamburger</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => this.props.navigation.navigate('FoodMenu', { activeTab: 'pizza' })}
              >
                <Image
                  source={require('../../Img/pizza.jpg')}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Pizza</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => this.props.navigation.navigate('FoodMenu', { activeTab: 'drink' })}
              >
                <Image
                  source={require('../../Img/drink.jpg')}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Đồ uống</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => this.props.navigation.navigate('FoodMenu', { activeTab: 'other' })}
              >
                <Image
                  source={require('../../Img/other.jpg')}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>Món ăn khác</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  categoryCard: {
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    opacity: 0.5,
  },
  categoryText: {
    color: 'white',
    position: 'absolute',
    fontSize: 30,
    //fontWeight: 'bold',
    fontFamily: 'VarelaRound'
  }
})

export default AppTab;

// const StackNavigator = createStackNavigator(
//   {
//     App: AppTabScreen,
//     FoodMenu: FoodMenuScreen,
//     FoodDetail: FoodDetailScreen,
//   },
//   {
//     initialRouteName: "App",
//     headerMode: 'none',
//     navigationOptions: {
//         headerVisible: false,
//     }
//   }
// );
//
// const AppTabContainer = createAppContainer(StackNavigator);
//
// export default class AppTab extends React.Component {
//   render() {
//     return <AppTabContainer />;
//   }
// }
