import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast } from 'native-base';

class CCCartItemCard extends Component {
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

export default class CartItemCard extends Component {
  render() {
    const { food, amount, removeItem, increaseAmount, decreaseAmount } = this.props;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.foodInfoContainer}>
          <Image
            style={styles.image}
            source={{uri: food.poster}}
          />
          <View style={styles.detailContainer}>
            <View style={styles.textContainer}>
              <Text style={{fontSize: 20, fontWeight: "bold"}}>{food.title}</Text>
              <Text style={{ color: "#888888" }}>{food.getFormalizedType()}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{fontSize: 18, fontWeight: "bold", color: "orange"}}
            >
              {helper.convertIntToVND(food.getIntPrice() * amount)}
            </Text>
          </View>
        </View>
        <View style={styles.line}/>
        <View style={styles.optionContainer}>
          <View style={{flexDirection: "row", marginHorizontal: 10, }}>
            <TouchableOpacity
              style={styles.amountButton}
              onPress={() => decreaseAmount(food.id)}
            >
              <Icon
                name='md-remove-circle-outline'
                style={{fontSize: 30, color: 'black'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>{amount}</Text>
            <TouchableOpacity
              style={styles.amountButton}
              onPress={() => increaseAmount(food.id)}
            >
              <Icon
                name='md-add-circle-outline'
                style={{fontSize: 30, color: 'black'}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeItem(food.id)}
          >
            <Icon
              name='md-trash'
              style={{fontSize: 30, color: 'black', marginHorizontal: 20,}}
            />
          </TouchableOpacity>
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
    flex: 1,
    flexDirection: "row",
    height: 125,
  },
  cardContainer: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 5,
  },
  foodInfoContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
    height: 65,
  },
  line: {
    height: 1,
    backgroundColor: "#bbbbbb",
    marginHorizontal: 5,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 10,
  },
  image: {
    flex: 1,
  },
  foodTextContainer: {
    flex: 3,
    flexDirection: "column",
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
