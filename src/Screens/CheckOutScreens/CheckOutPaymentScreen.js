import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab, Radio } from 'native-base';


export default class CheckOutPaymentScreen extends Component {
  state = {
    choosenDeliveryMethodId: 'standard',
    choosenPaymentMethodId: 'cod',
  }

  changeDeliveryMethod(deliveryMethod) {
    this.setState({ choosenDeliveryMethodId: deliveryMethod });
  }

  changePaymentMethod(paymentMethod) {
    this.setState({ choosenPaymentMethodId: paymentMethod });
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
                style={styles.notDoneStep}
              />
              <Text style={styles.notDoneStep} >Xác nhận</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.card}>
              <View style={styles.cardTitle}>
                <View style={styles.line} />
                <Text style={styles.titleText}>Hình thức giao hàng</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.cardContent}>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.changeDeliveryMethod('standard')}
                >
                  <Radio
                    selected={this.state.choosenDeliveryMethodId === 'standard'}
                    color={ '#bbbbbb' }
                    selectedColor={ '#2372F5' }
                    style={ styles.radioButton }
                  />
                  <View style={styles.option}>
                    <Text style={styles.optionText}>Giao hàng tiêu chuẩn</Text>
                    <Text style={{ ...styles.optionText, color: '#2372F5' }}>12.000 đ</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.changeDeliveryMethod('fast')}
                >
                  <Radio
                    selected={this.state.choosenDeliveryMethodId === 'fast'}
                    color={ '#bbbbbb' }
                    selectedColor={ '#2372F5' }
                    style={ styles.radioButton }
                  />
                  <View style={styles.option}>
                    <Text style={styles.optionText}>Giao hàng nhanh</Text>
                    <Text style={{ ...styles.optionText, color: '#2372F5' }}>22.000 đ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardTitle}>
                <View style={styles.line} />
                <Text style={styles.titleText}>Hình thức thanh toán</Text>
                <View style={styles.line} />
              </View>
              <View style={styles.cardContent}>
                <TouchableOpacity
                  style={styles.optionContainer}
                  onPress={() => this.changePaymentMethod('cod')}
                >
                  <Radio
                    selected={this.state.choosenPaymentMethodId === 'cod'}
                    color={ '#bbbbbb' }
                    selectedColor={ '#2372F5' }
                    style={ styles.radioButton }
                  />
                  <View style={styles.option}>
                    <Text style={styles.optionText}>Thanh toán tiền mặt khi nhận thức ăn</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                >
                  <Radio
                    selected={false}
                    color={ '#bbbbbb' }
                    selectedColor={ '#2372F5' }
                    style={ styles.radioButton }
                  />
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText, color: '#bbbbbb' }}>Thanh toán bằng thẻ quốc tế Visa, Master, JCB</Text>
                    <Text style={{ ...styles.optionText, color: '#bbbbbb' }}>Chưa hỗ trợ</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionContainer}
                >
                  <Radio
                    selected={false}
                    color={ '#bbbbbb' }
                    selectedColor={ '#2372F5' }
                    style={ styles.radioButton }
                  />
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText, color: '#bbbbbb' }}>Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)</Text>
                    <Text style={{ ...styles.optionText, color: '#bbbbbb' }}>Chưa hỗ trợ</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                  <Radio
                    selected={false}
                    color={ '#bbbbbb' }
                    selectedColor={ '#2372F5' }
                    style={ styles.radioButton }
                  />
                  <View style={styles.option}>
                    <Text style={{ ...styles.optionText, color: '#bbbbbb' }}>Thanh toán bằng MoMo</Text>
                    <Text style={{ ...styles.optionText, color: '#bbbbbb' }}>Chưa hỗ trợ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Button
            full
            style={{ height: 50, elevation: 6, backgroundColor: '#F5A623' }}
            onPress={() => this.props.navigation.navigate('CheckOutConfirmation',
                                                          { address: user.addressList[user.defaultAddressId],
                                                            deliveryMethod: this.state.choosenDeliveryMethodId,
                                                            paymentMethod: this.state.choosenPaymentMethodId,
                                                            cart: user.cart, }
                                                          )}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>TIẾP TỤC</Text>
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
    marginVertical: 5,
    backgroundColor: 'white'
  },
  optionContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  radioButton: {
    marginRight: 15,
  },
  option: {
    flexDirection: 'column',
  },
  optionText: {
    fontSize: 14,
    color: '#888888',
    marginRight: 10,
  },
});
