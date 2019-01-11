import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab } from 'native-base';

import CartItemCard from './CartItemCard';

export default class CartScreen extends Component {
  state = {
    cart: user.cart,
  }

  getTotalPriceInt() {
    return this.state.cart.getTotalPrice();
  }

  getTotalPriceText() {
    return helper.convertIntToVND(this.state.cart.getTotalPrice());
  }

  removeItem = (id) => {
    user.cart.removeFood(id);
    this.setState({cart: user.cart});
  }

  increaseItemAmount = (id) => {
    user.cart.increaseFoodAmount(id);
    this.setState({cart: user.cart});
  }

  decreaseItemAmount = (id) => {
    user.cart.decreaseFoodAmount(id);
    this.setState({cart: user.cart});
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 70, }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{color: "white", textAlign: 'center',}}>My Cart</Text>
          </Body>
          <Right/>
        </Header>
          <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {this.state.cart.FoodList.map((cartItem, index) =>
                <CartItemCard
                  food={cartItem.food}
                  amount={cartItem.amount}
                  removeItem={this.removeItem}
                  increaseAmount={this.increaseItemAmount}
                  decreaseAmount={this.decreaseItemAmount}
                  key={index}
                />
              )}
            </ScrollView>
            <View style={styles.totalPriceContainer}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}
              >Total:</Text>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "orange", margin: 10 }}
              >{this.getTotalPriceText()}</Text>
            </View>
            <Button
              full
              warning
              style={{ height: 50, elevation: 6 }}
              onPress={() => this.props.navigation.navigate('CheckOut')}
            >
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>Checkout</Text>
              </View>
            </Button>
          </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: "#eeeeee",
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    elevation: 5,
  },
});
