import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab, Radio, Toast } from 'native-base';
import Order from '../../AppData/Order';


export default class CheckOutConfirmationScreen extends Component {
  state = {
    choosenDeliveryMethodId: 0,
    choosenPaymentMethodId: 0,
  }

  changeDeliveryMethod(id) {
    this.setState({ choosenDeliveryMethodId: id });
  }

  changePaymentMethod(id) {
    this.setState({ choosenPaymentMethodId: id });
  }

  createOrder() {
    const address = this.props.navigation.getParam('address');
    const paymentMethod = this.props.navigation.getParam('paymentMethod');
    const deliveryMethod = this.props.navigation.getParam('deliveryMethod');
    const cart = this.props.navigation.getParam('cart');
    const id = '1616511'; //temp
    const date = '12/1/2019'; //temp
    const status = 'Đang xử lí';
    user.addNewOrder(new Order(id, date, status, address, deliveryMethod, paymentMethod, cart));
    user.cart.emptyCart();

    Toast.show({
      text: 'Đặt thức ăn thành công!',
      buttonText: 'Okay',
      type: "success",
    })

    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    const address = this.props.navigation.getParam('address');
    const paymentMethod = this.props.navigation.getParam('paymentMethod');
    const deliveryMethod = this.props.navigation.getParam('deliveryMethod');
    const cart = this.props.navigation.getParam('cart');
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
            <Text style={{color: "white", textAlign: 'center',}}>Thanh toán</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <Icon
                name='md-pin'
                style={styles.doneStep}
              />
              <Text style={styles.doneStep}>Địa chỉ</Text>
            </View>
            <View style={styles.step}>
              <Icon
                name='md-card'
                style={styles.doneStep}
              />
              <Text style={styles.doneStep} >Thanh toán</Text>
            </View>
            <View style={styles.step}>
              <Icon
                name='md-checkmark-circle'
                style={styles.doneStep}
              />
              <Text style={styles.doneStep} >Xác nhận</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <View style={styles.line}/>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Địa chỉ người nhận</Text>
              </View>
              <View style={styles.line}/>
              <View style={styles.cardContent}>
                <Text style={ styles.cardText }>{address.name}</Text>
                <Text style={{ ...styles.cardText, color: '#888888', }}>{address.phoneNumber}</Text>
                <Text style={{ ...styles.cardText, color: '#888888', }}>{address.getFullAddress()}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.line}/>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Hình thức giao hàng</Text>
              </View>
              <View style={styles.line}/>
              <View style={styles.cardContent}>
                <Text style={{ ...styles.cardText, color: '#888888', }}>{helper.getDeliveryMethod(deliveryMethod)}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.line}/>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Hình thức thanh toán</Text>
              </View>
              <View style={styles.line}/>
              <View style={styles.cardContent}>
                <Text style={{ ...styles.cardText, color: '#888888', }}>{helper.getPaymentMethod(paymentMethod)}</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.line}/>
              <View style={styles.cardTitle}>
                <Text style={styles.titleText}>Thông tin đơn hàng</Text>
              </View>
              <View style={styles.line}/>
              <View style={styles.cartCardContent}>
                {cart.FoodList.map((cartItem, index) =>
                  <View key={index}>
                    <View
                      style={styles.cartItemContainer}
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={{uri: cartItem.food.poster}}
                        />
                      </View>
                      <View style={styles.cartItemInfoContainer}>
                        <Text style={styles.cartTitle}>{cartItem.food.title}</Text>
                        <Text style={styles.cartSubtext}>{cartItem.food.getFormalizedType()}</Text>
                        <View style={styles.priceContainer}>
                          <Text style={styles.price}>{cartItem.food.price}</Text>
                          <Text style={styles.amount}>x {cartItem.amount}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={ {...styles.line, marginHorizontal: 15} }/>
                  </View>
                )}
              </View>
              <View style={styles.tempPriceContainer}>
                <Text
                  style={{ fontSize: 14, margin: 10, color: '#888888' }}
                >Tạm tính</Text>
                <Text
                  style={{ fontSize: 14, margin: 10 }}
                >{helper.convertIntToVND(cart.getTotalPrice())}</Text>
              </View>
              <View style={styles.tempPriceContainer}>
                <Text
                  style={{ fontSize: 14, margin: 10, color: '#888888' }}
                >Phí vận chuyển</Text>
                <Text
                  style={{ fontSize: 14, margin: 10 }}
                >{helper.convertIntToVND(helper.getDeliveryCharge(deliveryMethod))}</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.totalPriceContainer}>
            <Text
              style={{ fontSize: 14, margin: 10, color: '#888888' }}
            >Thành tiền</Text>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "orange", margin: 10 }}
            >{helper.convertIntToVND(cart.getTotalPrice() + helper.getDeliveryCharge(deliveryMethod))}</Text>
          </View>
          <Button
            full
            style={{ height: 50, elevation: 6, backgroundColor: '#F5A623' }}
            onPress={() => this.createOrder()}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>TIẾN HÀNH ĐẶT HÀNG</Text>
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
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 2,
  },
  step: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  doneStep: {
    color: '#2372F5'
  },
  notDoneStep: {
    color: '#bbbbbb'
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 10,
    paddingBottom: 5,
    //elevation: 1,
  },
  cardTitle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#bbbbbb',
  },
  cardContent: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white'
  },
  cardText: {
    fontSize: 14,
    marginRight: 10,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "white",
    elevation: 5,
  },
  tempPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "white",
    elevation: 5,
  },
  cartCardContent: {
    flexDirection: 'column',
    //marginVertical: 10,
    backgroundColor: 'white'
  },
  cartItemContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 2,
    margin: 15,
    height: 90,
  },
  image: {
    flex: 1,
  },
  cartItemInfoContainer: {
    flex: 5,
    flexDirection: 'column',
    marginVertical: 15,
  },
  cartTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    marginRight: 15,
  },
  cartSubtext: {
    fontSize: 12,
    color: '#bbbbbb',
    marginBottom: 5,
    marginRight: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 15,
  },
  amount: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});
