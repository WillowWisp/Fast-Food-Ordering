import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab } from 'native-base';

import CartItemCard from './CartItemCard';

export default class CartScreen extends Component {
  state = {
    cart: user.cart,
  }

  render() {
    return (
      <Container>
        <Header>
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref='_scrollView'
        >
          {this.state.cart.FoodList.map((cartItem, index) =>
            <CartItemCard
              food={cartItem.food}
              amount={cartItem.amount}
              key={index}
            />
          )}
        </ScrollView>
        <Button
          full
          warning
          style={{ height: 50 }}
        >
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{alignSelf: 'center'}}>Checkout</Text>
          </View>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'column',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
    backgroundColor: "#eeeeee",
  },
});
