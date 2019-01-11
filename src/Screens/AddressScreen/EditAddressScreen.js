import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer,
          FooterTab, Form, Item, Input, Label, CheckBox, Toast } from 'native-base';
import Address from '../../AppData/Address';


export default class EditAddressScreen extends Component {
  state = {
    fullName: '',
    phoneNumber: '',
    city: '',
    detailAddress: '',
    setDefaultChecked: false,
  }

  changeSetAsDefaultCheckbox() {
    this.setState({ setDefaultChecked: !this.state.setDefaultChecked });
  }

  updateAddress() {
    const fullName = this._fullName.props.value;
    const phoneNumber = this._phoneNumber.props.value;
    const city = this._city.props.value;
    const detailAddress = this._detailAddress.props.value;
    //console.log(fullName + " " + phoneNumber + " " + city + " " + detailAddress);
    if (fullName === "" || phoneNumber === "" || city === "" || detailAddress === "") {
      Toast.show({
        text: 'Please enter all fields',
        buttonText: 'Okay',
        type: "danger"
      })
      return;
    }
    if (!helper.isNumberString(phoneNumber) || phoneNumber.length < 9) {
      Toast.show({
        text: 'Phone number is invalid',
        buttonText: 'Okay',
        type: "danger"
      })
      return;
    }

    const id = this.props.navigation.getParam('id');

    user.editAddress(id, fullName, phoneNumber, city, detailAddress);

    if (this.state.setDefaultChecked) {
      user.changeDefautAddress(id);
    }

    Toast.show({
      text: 'Address updated!',
      buttonText: 'Okay',
      type: "success",
    })

    const onClose = this.props.navigation.getParam('onClose');
    onClose();
    this.props.navigation.goBack();
  }

  componentDidMount() {
    const defaultChecked = this.props.navigation.getParam('defaultChecked');
    const address = this.props.navigation.getParam('address');
    this.setState({
      fullName: address.name,
      phoneNumber: address.phoneNumber,
      city: address.city,
      detailAddress: address.detailAddress,
      setDefaultChecked: defaultChecked,
    });
  }

  render() {
    const address = this.props.navigation.getParam('address');
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
            <Text style={{color: "white", textAlign: 'center',}}>Update Address</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1, backgroundColor: "#eeeeee", justifyContent: 'space-between' }}>
          <View style={styles.formContainer}>
            <Form>
              <Item floatingLabel>
                <Label style={styles.label}>Full name</Label>
                <Input
                  onChangeText={(fullName) => this.setState({fullName})}
                  value={this.state.fullName}
                  getRef={(c) => this._fullName = c}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>Phone number</Label>
                <Input
                  keyboardType='numeric'
                  maxLength={10}
                  onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                  value={this.state.phoneNumber}
                  getRef={(c) => this._phoneNumber = c}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>City</Label>
                <Input
                  onChangeText={(city) => this.setState({city})}
                  value={this.state.city}
                  getRef={(c) => this._city = c}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>Detail address</Label>
                <Input
                  onChangeText={(detailAddress) => this.setState({detailAddress})}
                  value={this.state.detailAddress}
                  getRef={(c) => this._detailAddress = c}
                />
              </Item>
            </Form>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={this.state.setDefaultChecked}
                color={'#888888'}
                ref='_setAsDefaultCheckBox'
                onPress={() => this.changeSetAsDefaultCheckbox()}
              />
              <Text style={{ fontSize: 12, marginLeft: 25 }}>Set as default address</Text>
            </View>
          </View>
          <Button
            full
            style={{ height: 50, elevation: 6, backgroundColor: '#F5A623' }}
            onPress={() => this.updateAddress()}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>Update address</Text>
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
