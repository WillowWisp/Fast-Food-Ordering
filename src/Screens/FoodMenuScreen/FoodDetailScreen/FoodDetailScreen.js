import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast } from 'native-base';
import Cart from '../../../AppData/Cart';
import Food from '../../../AppData/Food';


export default class FoodDetail extends Component {

  state = {
    optionVisible: false,
    amount: 1,
  }

  increaseAmount = () => {
    this.setState({amount: this.state.amount + 1});
  }

  decreaseAmount = () => {
    if (this.state.amount > 1) {
      this.setState({amount: this.state.amount - 1});
    }
  }

  getArrowIcon = () => {
    if (this.state.optionVisible === false)
      return 'md-arrow-up'
    return 'md-arrow-down'
  }

  changeOptionVisible = () => {
    this.setState({optionVisible: !this.state.optionVisible});
  }

  render() {
    const { navigation } = this.props;
    const food = navigation.getParam('food');
    const foodClass = new Food(food.id, food.title, food.poster, food.price, food.weight, food.type);
    const cart = new Cart();

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
          <Body/>
          <Right/>
        </Header>
        <View style={styles.container}>
          <Image
            style={styles.backgroundImage}
            source={{uri: food.poster}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.foodName}>{food.title}</Text>
            <View style={styles.priceAndWeightContainer}>
              <Text style={styles.priceText}>{food.price}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={this.changeOptionVisible}
            >
              <Left>
                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>Options</Text>
              </Left>
              <Body>
                <Icon name={this.getArrowIcon()} />
              </Body>
              <Right/>
            </TouchableOpacity>
            {this.state.optionVisible === true ?
              <View style={styles.amountContainer}>
                <Text style={{fontSize: 20}}>Amount: </Text>
                <TouchableOpacity
                  style={styles.amountButton}
                  onPress={this.decreaseAmount}
                >
                  <Icon
                    name='md-remove-circle-outline'
                    style={{fontSize: 30, color: 'black'}}
                  />
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>{this.state.amount}</Text>
                <TouchableOpacity
                  style={styles.amountButton}
                  onPress={this.increaseAmount}
                >
                  <Icon
                    name='md-add-circle-outline'
                    style={{fontSize: 30, color: 'black'}}
                  />
                </TouchableOpacity>
              </View>
              : null
            }

            <Button
              block
              warning
              style={{borderRadius: 10}}
              onPress={() => {
                user.cart.addFood(foodClass, this.state.amount);
                Toast.show({
                  text: "Food added to cart",
                  buttonText: "Okay",
                  type: "success",
                });
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Add To Cart</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  // Main container
  container: {
    //...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  layout: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    flexDirection: "row",
    //height: 150,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  foodName: {
    flex: 2,
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 8,
  },
  priceAndWeightContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'blue',
  },
  weightText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    margin: 5,
  },
  priceText: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
    //backgroundColor: 'white',
    margin: 5,
    //textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  optionContainer: {
    //flex: 1,
    marginVertical: 10,
    flexDirection: "row",
    //height: 30,
  },
  amountContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    //backgroundColor: 'blue',
    marginBottom: 10,
  },
  amountButton: {
    marginHorizontal: 10,
  }
});
