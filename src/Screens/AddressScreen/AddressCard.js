import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast, Radio } from 'native-base';

export default class AddressCard extends Component {
  confirmRemoving() {
    Alert.alert(
      'Xác nhận',
      'Bạn có thật sự muốn xóa địa chỉ này?',
      [
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: 'Yes', onPress: this.props.remove.bind(this, this.props.id)},
      ],
      { cancelable: true }
    )
  }

  render() {
    const { address, id, remove, navigation, onAddressChanged } = this.props;
    return (
      <View
        style={styles.cardContainer}
      >
        <View style={styles.topContentsContainer}>
          <Text
            style={{ fontSize: 16 }}
            ref='_addressName'
          >{address.name}</Text>
          <View style={styles.configAndRemoveContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAddress',
                                                  { address, id, defaultChecked: id === user.defaultAddressId, onClose: onAddressChanged }
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
          <Text style={{ marginTop: 5, color: '#888888' }}>{address.getFullAddress()}</Text>
          <Text style={{ color: '#888888' }}>{address.phoneNumber}</Text>
        </View>
        { id === user.defaultAddressId ?
          <Text style={{ marginTop: 5, color: '#2372F5', fontSize: 12 }}>Địa chỉ mặc định</Text>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    padding: 15,
    backgroundColor: "white",
  },
  topContentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  configAndRemoveContainer: {
    flexDirection: 'row'
  },
  phoneNumberAndAddressContainer: {
    flexDirection: 'column',
  },
});
