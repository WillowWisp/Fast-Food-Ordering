import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, Toast, Radio } from 'native-base';

export default class OrderCard extends Component {
  render() {
    const { order, id, navigation } = this.props;
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('OrderDetail', { order })}
      >
        <View style={styles.topContentsContainer}>
          <Text
            style={{ fontSize: 16 }}
            ref='_orderName'
          >{order.cart.getShortenedAllFood()}</Text>
        </View>
        <View style={styles.phoneNumberAndAddressContainer}>
          <Text style={{ marginTop: 5, color: '#888888' }}>Mã đơn hàng: {user.uid === '' ? 'guess' : user.uid}{order.id}</Text>
          <Text style={{ color: '#888888' }}>Ngày đặt hàng: {order.date}</Text>
          <Text style={{ color: '#888888' }}>Trạng thái: {order.status}</Text>
        </View>
      </TouchableOpacity>
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
