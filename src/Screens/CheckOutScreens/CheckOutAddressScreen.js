import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer,
          FooterTab, Toast } from 'native-base';
import AddressCard from './AddressCard';


export default class CheckOutAddressScreen extends Component {
  state = {
    addressList: user.addressList,
    choosenRadioButtonId: user.defaultAddressId,
  }

  changeChoosenRadioButton = (id) => {
    user.changeDefautAddress(id);
    this.setState({ choosenRadioButtonId: user.defaultAddressId });
  }

  removeAddress = (id) => {
    user.removeAddress(id);
    this.setState({ addressList: user.addressList,
                    choosenRadioButtonId: user.defaultAddressId,
                  });
  }

  onAddressListChanged = () => {
    this.setState({ addressList: user.addressList,
                    choosenRadioButtonId: user.defaultAddressId,
                  });
  }

  addressCheckOutPressed() {
    //console.log(this.state.choosenRadioButtonId);
    if (this.state.addressList.length === 0 || this.state.choosenRadioButtonId < 0) {
      Toast.show({
        text: 'Vui lòng cung cấp địa chỉ',
        buttonText: 'Okay',
        type: "danger"
      })
      return;
    }
    this.props.navigation.navigate('CheckOutPayment')
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 70, elevation: 5, }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Cart')}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{color: "white", textAlign: 'center',}}>Địa chỉ giao</Text>
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
                style={styles.notDoneStep}
              />
              <Text style={styles.notDoneStep} >Thanh toán</Text>
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
            <View
              style={{ height: 4, backgroundColor: '#eeeeee' }}
            />
            {this.state.addressList.map((address, index) =>
              <AddressCard
                address={address}
                key={index}
                id={index}
                radioChecked={index === this.state.choosenRadioButtonId}
                remove={this.removeAddress}
                onTouch={this.changeChoosenRadioButton}
                navigation={this.props.navigation}
                onAddressChanged={this.onAddressListChanged}
              />
            )}
            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={() => this.props.navigation.navigate('NewAddress',
                                                            { onClose: this.onAddressListChanged })
              }
            >
              <Icon
                name='md-add-circle-outline'
                style={{ color: '#2372F5', marginHorizontal: 5 }}
              />
              <Text
                style={{ marginHorizontal: 5, color: '#2372F5', fontSize: 16, fontWeight: 'bold' }}
              >Thêm địa chỉ mới</Text>
            </TouchableOpacity>
          </ScrollView>
          <Button
            full
            style={{ height: 50, elevation: 6, backgroundColor: '#EE7B37' }}
            onPress={() => this.addressCheckOutPressed()}
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
  addAddressButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});
