import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab, Radio, Toast } from 'native-base';



export default class OrderDetailScreen extends Component {
    render() {
      const order = this.props.navigation.getParam('order');
      const { id, date, status, address, paymentMethod, deliveryMethod, cart } = order
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
              <Text style={{color: "white", textAlign: 'center',}}>Chi tiết đơn hàng</Text>
            </Body>
            <Right/>
          </Header>
          <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                <View style={styles.line}/>
                <View style={styles.cardTitle}>
                  <Text style={styles.titleText}>Mã đơn hàng: {user.uid === '' ? 'guess' : user.uid}{id}</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.cardContent}>
                  <Text style={{ ...styles.cardText, color: '#888888', }}>Ngày đặt hàng: {date}</Text>
                  <Text style={{ ...styles.cardText, color: '#888888', }}>Trạng thái: {status}</Text>
                </View>
              </View>
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
