import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon, Text, StyleProvider, Toast } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';

export default class CustomBurgerScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: {
        cucumber: 1,
        tomato: 1,
        salad: 1,
        cheese: 1,
        steak: 1,
      }
    }
  }

  getTotalIngredients = () => {
    return Object.keys(this.state.ingredients).reduce((sum,key)=>sum+parseFloat(this.state.ingredients[key]||0),0);
  }

  increaseIngredient = (ingredientName) => {
    let amount = this.state.ingredients[ingredientName];
    const totalIngredients = this.getTotalIngredients();
    if (amount >= 3 || totalIngredients >= 9)
      return;
    
    const updatedIngredients = {...this.state.ingredients};
    amount++;
    updatedIngredients[ingredientName] = amount;
    this.setState({ ingredients: updatedIngredients });
  }

  decreaseIngredient = (ingredientName) => {
    let amount = this.state.ingredients[ingredientName];
    const totalIngredients = this.getTotalIngredients();
    if (amount <= 0 || totalIngredients <= 3)
      return;
    
    const updatedIngredients = {...this.state.ingredients};
    amount--;
    updatedIngredients[ingredientName] = amount;
    this.setState({ ingredients: updatedIngredients });
  }

  _renderOptions = () => {
    const options = Object.keys(this.state.ingredients).map(ingredientName => {
      const capitalizedName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);

      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#bbb'}}>
          <View style={{flex: 3}}>
            <Text style={{fontWeight: '600', color: '#444'}}>
              {capitalizedName}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
           <TouchableOpacity onPress={() => this.increaseIngredient(ingredientName)}>
             <Icon name='md-add-circle-outline' style={{color: '#00db3a'}} />
           </TouchableOpacity>
           <Text style={{color: '#333'}}>
             {this.state.ingredients[ingredientName]}
           </Text>
           <TouchableOpacity onPress={() => this.decreaseIngredient(ingredientName)}>
             <Icon name='md-remove-circle-outline' style={{color: '#ff2b63'}} />
           </TouchableOpacity>
          </View>
        </View>
      );
    });
    return options;
  }

  _renderBun = (bunName) => {
    const totalIngredients = this.getTotalIngredients();

    let imageSource;
    let initTopOffset;
    let initElevation;

    switch (bunName) {
      case 'topBun':
      imageSource = require('../../../assets/burgerIngredients/TopBun.png');
      initTopOffset = 5;
      initElevation = totalIngredients + 1;
      break;
      case 'botBun':
      imageSource = require('../../../assets/burgerIngredients/BotBun.png');
      initTopOffset = 45 + 20 * (totalIngredients + 1) - 20; // -10 vì initTopOffset của Steak bị giảm đi 10
      initElevation = 0;
      break;
    }

    const bunStyle = {
      position: 'absolute',
      top: initTopOffset,
      height: 100,
      width: '70%',
      elevation: initElevation,
    }

    return (<Image resizeMode='stretch' source={imageSource} style={bunStyle} key={bunName} />);
  }

  _renderIngredient = (ingredientName) => {
    const totalIngredients = this.getTotalIngredients();
    
    const returnValue = [];
    const ingredientStyles = [];

    let previousIngredients; //int: tổng số lượng ingredient trước đó

    let imageSource;
    let specificOffset = 0;

    switch (ingredientName) {
      case 'cucumber':
      imageSource = require('../../../assets/burgerIngredients/Cucumber.png');
      previousIngredients = 0;
      break;
      case 'tomato':
      imageSource = require('../../../assets/burgerIngredients/Tomato.png');
      previousIngredients = this.state.ingredients.cucumber;
      break;
      case 'salad':
      imageSource = require('../../../assets/burgerIngredients/Salad.png');
      specificOffset = -10;
      previousIngredients = this.state.ingredients.cucumber + this.state.ingredients.tomato;
      break;
      case 'cheese':
      imageSource = require('../../../assets/burgerIngredients/Cheese.png');
      previousIngredients = this.state.ingredients.cucumber + this.state.ingredients.tomato + this.state.ingredients.salad;
      break;
      case 'steak':
      imageSource = require('../../../assets/burgerIngredients/Steak.png');
      specificOffset = -10;
      previousIngredients = this.state.ingredients.cucumber + this.state.ingredients.tomato + this.state.ingredients.salad + this.state.ingredients.cheese;
      break;
    }

    let initTopOffset = 40 + 20 * previousIngredients;
    initTopOffset += specificOffset;

    const initElevation = totalIngredients - previousIngredients;

    for (let i = 0; i < this.state.ingredients[ingredientName]; i++) {
      ingredientStyles.push({
        position: 'absolute',
        top: initTopOffset + i * 20,
        height: 100,
        width: '70%',
        elevation: initElevation - i,
      });

      returnValue.push(<Image resizeMode='stretch' source={imageSource} style={ingredientStyles[i]} key={ingredientName + i} />);
    }
    
    return returnValue;
  }

  render() {
    console.disableYellowBox = true;

    return(
      <StyleProvider style={getTheme(customizedTheme)}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Custom Burger</Title>
            </Body>
            <Right />
          </Header>

          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, justifyContent: 'space-evenly', paddingHorizontal: 10, backgroundColor: '#eee', elevation: 2}}>
              {this._renderOptions()}
            </View>
            <View style={{flex: 2, alignItems: 'center'}}>
              {this._renderBun('topBun')}
              {this._renderIngredient('cucumber')}
              {this._renderIngredient('tomato')}
              {this._renderIngredient('salad')}
              {this._renderIngredient('cheese')}
              {this._renderIngredient('steak')}
              {this._renderBun('botBun')}
            </View>
          </View>
        </Container>
      </StyleProvider>
    );
  }
}