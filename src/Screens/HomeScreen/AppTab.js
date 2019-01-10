import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, StyleProvider, Toast, Badge } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

class AppTab extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      badgeText: user.cart.FoodList.length,
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    })
  }

  renderContent = () => {
    if (this.state.currentUser) {
      return (<Text onPress={() => firebase.auth().signOut()}>Hello</Text>);
    }

    return (<Text>Not logged in.</Text>);
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
              <Title>Burger King</Title>
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
                  style={{ alignSelf: 'flex-end', position: 'absolute', scaleX: 0.8, scaleY: 0.8}}
                >
                  <Text>{this.state.badgeText}</Text>
                </Badge>
              </TouchableOpacity>
            </Right>
          </Header>

          <Content padder>
            <View style={[styles.container,
                          {flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'}]}>
              <View style={styles.layout}>
                <Button onPress={() => this.props.navigation.navigate('FAQ')}>
                  <Text>Go to FAQ</Text>
                </Button>
              </View>
              <View style={styles.layout}>
                <Button
                  onPress={() =>
                    this.props.navigation.navigate('FoodMenu')}
                >
                  <Text>Food Menu</Text>
                </Button>
              </View>
            </View>
            <Button onPress={()=> Toast.show({
              text: '(Test) Total price in cart: ' + user.cart.getTotalPrice(),
              buttonText: 'Okay',
              duration: 30000,
            })}>
              <Text>Test</Text>
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Cart')}>
              <Text>Cart</Text>
            </Button>
          </Content>
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
