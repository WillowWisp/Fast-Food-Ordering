import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer,
          FooterTab, Toast } from 'native-base';


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
    user.cart.removeFoodOnFirebase(id);
    user.cart.removeFood(id);
    this.setState({cart: user.cart});
  }

  increaseItemAmount = (id) => {
    user.cart.increaseFoodAmountOnFirebase(id);
    user.cart.increaseFoodAmount(id);
    this.setState({cart: user.cart});
  }

  decreaseItemAmount = (id) => {
    user.cart.decreaseFoodAmountOnFirebase(id);
    user.cart.decreaseFoodAmount(id);
    this.setState({cart: user.cart});
  }

  checkOutPressed() {
    if (this.state.cart.FoodList.length === 0) {
      Toast.show({
        text: 'Giỏ hàng rỗng',
        buttonText: 'Okay',
        type: "danger"
      })
      return;
    }
    this.props.navigation.navigate('CheckOut');
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
            <Text style={{color: "white", textAlign: 'center',}}>Giỏ hàng</Text>
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
              >Thành tiền:</Text>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "orange", margin: 10 }}
              >{this.getTotalPriceText()}</Text>
            </View>
            <Button
              full
              style={{ height: 50, elevation: 6, backgroundColor: '#F5A623' }}
              onPress={() => this.checkOutPressed()}
            >
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>TIẾN HÀNH ĐẶT</Text>
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
