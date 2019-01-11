import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast, Radio } from 'native-base';

export default class AddressCard extends Component {
  confirmRemoving() {
    Alert.alert(
      'Confirm',
      'Do you really want to delete this address?',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Yes', onPress: this.props.remove.bind(this, this.props.id)},
      ],
      { cancelable: true }
    )
  }

  render() {
    const { address, id, radioChecked, remove, onTouch, navigation, onAddressChanged } = this.props;
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={onTouch.bind(this, id)}
      >
        <View style={styles.topContentsContainer}>
          <View style={styles.nameAndRadioButtonContainer}>
            <Radio
              selected={radioChecked}
              selectedColor={ '#2372F5' }
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{ marginHorizontal: 5, fontWeight: 'bold', fontSize: 16 }}
              ref='_addressName'
            >{address.name}</Text>
          </View>
          <View style={styles.configAndRemoveContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAddress',
                                                  { address, id, defaultChecked: radioChecked, onClose: onAddressChanged }
                                                )
                      }
            >
              <Icon
                name='md-create'
                style={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.confirmRemoving()}
            >
              <Icon
                name='md-trash'
                style={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.phoneNumberAndAddressContainer}>
          <Text style={{ color: '#888888' }}>{address.phoneNumber}</Text>
          <Text style={{ marginTop: 5, color: '#888888' }}>{address.getFullAddress()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "white",
    marginTop: 1,
  },
  topContentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameAndRadioButtonContainer: {
    flexDirection: 'row',
  },
  phoneNumberAndAddressContainer: {
    flexDirection: 'column',
    marginLeft: 35,
  },
  configAndRemoveContainer: {
    flexDirection: 'row'
  }
});
