import React, { Component, PropTypes } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast, Text } from 'native-base';
import Modal from 'react-native-modal';


export default class CartItemCard extends Component {
  state = {
    isModalVisible: false,
    buttonClickable: true,
  }

  _renderInfoButton = () => {
    const { food } = this.props;

    if (food.ingredients === null) {
      return;
    }

    return (
      <TouchableOpacity
        style={{flex: 1, alignItems: 'center'}}
        onPress={() => this.setState({ isModalVisible: true })}
      >
        <Icon name='md-information-circle' />
      </TouchableOpacity>
    );
  }

  _renderModal = () => {
    return (
      <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({isModalVisible: false})}>
          <View style={styles.modalStyle}>
            <View style={{flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
              <Text style={{fontSize: 22, fontWeight: '700'}}>Danh sách thành phần</Text>
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
              {this._renderIngredients()}
            </View>
            <View style={{flex: 1}}> 
              <Button danger onPress={() => this.setState({isModalVisible: false})}>
                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>ĐÓNG</Text>
              </Button>
            </View>
          </View>
        </Modal>
    );
  }

  _renderIngredients = () => {
    const { food } = this.props;

    if (food.ingredients === null) {
      return;
    }

    return (
      Object.keys(food.ingredients).map(ingredientName => {
        const capitalizedName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1);
        return (<Text style={{color: '#555', fontWeight: '500'}}>- {capitalizedName}: {food.ingredients[ingredientName]}</Text>);
      })
    );
  }

  render() {
    const { food, amount, removeItem, increaseAmount, decreaseAmount } = this.props;
    return (
      <View style={styles.cardContainer}>
        {this._renderModal()}
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
          <View style={{flex: 1, alignItems: 'flex-start', flexDirection: "row", marginHorizontal: 10, }}>
            <TouchableOpacity
              style={styles.amountButton}
              disabled={!this.state.buttonClickable}
              onPress={() => {
                decreaseAmount(food.id);
                this.setState({buttonClickable: false});
                setTimeout(() => this.setState({buttonClickable: true}), 400);
              }}
            >
              <Icon
                name='md-remove-circle-outline'
                style={{fontSize: 30, color: 'black'}}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>{amount}</Text>
            <TouchableOpacity
              style={styles.amountButton}
              disabled={!this.state.buttonClickable}
              onPress={() => {
                increaseAmount(food.id);
                this.setState({buttonClickable: false});
                setTimeout(() => this.setState({buttonClickable: true}), 400);
              }}
            >
              <Icon
                name='md-add-circle-outline'
                style={{fontSize: 30, color: 'black'}}
              />
            </TouchableOpacity>
          </View>
          {this._renderInfoButton()}
          <TouchableOpacity
            style={{flex: 1, alignItems: 'flex-end'}}
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
  modalStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  modalCloseButton: {
    width: 90,
    height: 50,
    backgroundColor: '#ff9c2b',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
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
