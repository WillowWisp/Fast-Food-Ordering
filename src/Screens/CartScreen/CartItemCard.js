import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast } from 'native-base';

export default class CartItemCard extends Component {
  render() {
    const { food, amount } = this.props;
    return (
      <View style={styles.containerStyle}>
        <Image
          style={styles.image}
          source={{uri: food.poster}}
        />
        <View style={styles.detailContainer}>
          <View style={styles.textContainer}>
            <Text>{food.title}</Text>
            <Text>{food.weight}</Text>
          </View>
          <View style={styles.priceAndAmountContainer}>
            <View>
              <Text>{helper.convertIntToVND(food.getIntPrice() * amount)}</Text>
            </View>
            <View style={styles.amountContainer}>
              <TouchableOpacity
                style={styles.amountButton}
              >
                <Icon
                  name='md-remove-circle-outline'
                  style={{fontSize: 30, color: 'black'}}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 20}}>{amount}</Text>
              <TouchableOpacity
                style={styles.amountButton}
              >
                <Icon
                  name='md-add-circle-outline'
                  style={{fontSize: 30, color: 'black'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    marginBottom: 5,
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: "row",
    height: 125,
  },
  image: {
    flex: 1,
  },
  detailContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  textContainer: {
    flexDirection: "column",
    //marginBottom: 10,
  },
  priceAndAmountContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 10,
  },
  priceContainer: {

  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  amountButton: {
    marginHorizontal: 10,
  },
});
