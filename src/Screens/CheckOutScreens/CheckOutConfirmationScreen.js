import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab, Radio, Toast } from 'native-base';
import firebase from 'firebase';
import Modal from 'react-native-modal';
import Order from '../../AppData/Order';
import Cart from '../../AppData/Cart';


export default class CheckOutConfirmationScreen extends Component {
  state = {
    isModalVisible: false,
    orderId: '0',
  }

  createOrder() {
    const id = this.state.orderId;
    const address = this.props.navigation.getParam('address');
    const paymentMethod = this.props.navigation.getParam('paymentMethod');
    const deliveryMethod = this.props.navigation.getParam('deliveryMethod');
    const cartRef = this.props.navigation.getParam('cart');
    const cart = new Cart(cartRef.FoodList);
    //const date = '12/1/2019'; //temp
    const date = new Date().toISOString().slice(0, 10);
    //console.log(date);
    const status = 'Đang xử lí';
    user.addNewOrder(new Order(id, date, status, address, deliveryMethod, paymentMethod, cart));
    user.cart.emptyCart();

    firebase.database().ref('orderList/' + id).set({
      id: id,
      date: date,
      status: status,
      address: address,
      deliveryMethod: deliveryMethod,
      paymentMethod: paymentMethod,
      cart: cart,
    });

    this.setState({ isModalVisible: true });

    // Toast.show({
    //   text: 'Đặt thức ăn thành công!',
    //   buttonText: 'Okay',
    //   type: "success",
    // })

    // console.log(id);
    // this.props.navigation.navigate('HomeScreen');
  }

  getIdAndCreateOrder() {
    //var id;
    //const id = '';
    // firebase.database().ref('orderList/')
    //   .once('value').then((snapshot) => {
    //     const fetchedOrderList = snapshot.val();
    //     //console.log(fetchedOrderList);
    //     this.setState({ orderId: fetchedOrderList.length.toString() });
    //     console.log(this.state.orderId);
    //   });

    firebase.database().ref('orderList/').once('value').then((snapshot) => {
      const fetchedOrderList = snapshot.val();
      this.setState({ orderId: fetchedOrderList.length.toString() });
      this.createOrder();
    });


  }

  renderModal() {
    return (
      <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({isModalVisible: false})}>
          <View style={styles.modalStyle}>
            <View style={{ margin: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đơn hàng của bạn đã được gửi lên hệ thống!</Text>
            </View>
            <Icon
              name='ios-checkmark-circle-outline'
              style={{ fontSize: 120, color: 'green' }}
            />
            <View style={{ marginVertical: 20 }}>
              <Button
                danger
                onPress={() => {
                  this.setState({isModalVisible: false});
                  this.props.navigation.navigate('HomeScreen');
                }}
              >
                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>ĐÓNG</Text>
              </Button>
            </View>
          </View>
        </Modal>
    );
  }

  render() {
    const address = this.props.navigation.getParam('address');
    const paymentMethod = this.props.navigation.getParam('paymentMethod');
    const deliveryMethod = this.props.navigation.getParam('deliveryMethod');
    const cart = this.props.navigation.getParam('cart');
    return (
      <Container>
        {this.renderModal()}
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
            <Text style={{color: "white", textAlign: 'center',}}>Xác nhận</Text>
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
                        <Text style={styles.cartSubtext}>{globalPlaces[cartItem.food.placeId].title}</Text>
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
            onPress={() => this.getIdAndCreateOrder()}
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
  modalStyle: {
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
});
