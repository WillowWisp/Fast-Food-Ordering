import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer,
          FooterTab, Form, Item, Input, Label, CheckBox, Toast } from 'native-base';
import Address from '../../AppData/Address';


export default class NewAddressScreen extends Component {
  state = {
    setDefaultChecked: false,
  }

  changeSetAsDefaultCheckbox() {
    this.setState({ setDefaultChecked: !this.state.setDefaultChecked });
  }

  addNewAddress() {
    const fullName = this._fullName.props.value;
    const phoneNumber = this._phoneNumber.props.value;
    const city = this._city.props.value;
    const detailAddress = this._detailAddress.props.value;
    //console.log(fullName + " " + phoneNumber + " " + city + " " + detailAddress);
    if (fullName === "" || phoneNumber === "" || city === "" || detailAddress === "") {
      Toast.show({
        text: 'Vui lòng nhập đầy đủ',
        buttonText: 'Okay',
        type: "danger"
      })
      return;
    }
    if (!helper.isNumberString(phoneNumber) || phoneNumber.length < 9) {
      Toast.show({
        text: 'Số điện thoại không hợp lệ',
        buttonText: 'Okay',
        type: "danger"
      })
      return;
    }

    const newAddress = new Address(fullName, phoneNumber, city, detailAddress);

    const firebaseID = user.pushAddressToFirebase(newAddress);
    console.log(firebaseID);
    newAddress.firebaseID = firebaseID;
    user.addNewAddress(newAddress);
    
    if (this.state.setDefaultChecked) {
      user.changeDefautAddress(user.addressList.length - 1);
    }
    Toast.show({
      text: 'Thêm địa chỉ thành công!',
      buttonText: 'Okay',
      type: "success",
    })

    const onClose = this.props.navigation.getParam('onClose');
    onClose();
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 70, elevation: 5, }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{color: "white", textAlign: 'center',}}>Thêm địa chỉ mới</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1, backgroundColor: "#eeeeee", justifyContent: 'space-between' }}>
          <View style={styles.formContainer}>
            <Form>
              <Item floatingLabel>
                <Label style={styles.label}>Họ tên</Label>
                <Input getRef={(c) => this._fullName = c} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>Số điện thoại</Label>
                <Input
                  keyboardType='numeric'
                  maxLength={10}
                  getRef={(c) => this._phoneNumber = c}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>Tỉnh/Thành</Label>
                <Input getRef={(c) => this._city = c} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>Địa chỉ</Label>
                <Input getRef={(c) => this._detailAddress = c} />
              </Item>
            </Form>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={this.state.setDefaultChecked}
                color={'#888888'}
                ref='_setAsDefaultCheckBox'
                onPress={() => this.changeSetAsDefaultCheckbox()}
              />
              <Text style={{ fontSize: 12, marginLeft: 25 }}>Đặt làm địa chỉ mặc định</Text>
            </View>
          </View>
          <Button
            full
            style={{ height: 50, elevation: 6, backgroundColor: '#EE7B37' }}
            onPress={() => this.addNewAddress()}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>THÊM ĐỊA CHỈ</Text>
            </View>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  checkBoxContainer: {
    marginVertical: 30,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    fontSize: 14,
  }
});
