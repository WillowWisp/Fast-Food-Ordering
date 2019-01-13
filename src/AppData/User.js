import Cart from './Cart'
import Address from './Address'

import firebase from 'firebase';
import {Toast} from 'native-base';

export default class User {
  constructor() {
    this.uid = '';
    this.userName = '';
    this.email = '';
    this.orderList = [];
    this.addressList = [];
    this.cart = new Cart();
    this.defaultAddressId = -1;
  }

  pushAddressToFirebase(address) {
    if (user.uid !== '') {
      return firebase.database().ref(`users/${user.uid}/addressList`)
        .push({
          name: address.name,
          phoneNumber: address.phoneNumber,
          city: address.city,
          detailAddress: address.detailAddress,
        }).key;
    } else {
      return '';
    }
  }

  addNewAddress(address) {
    this.addressList.push(address);
    if (this.addressList.length === 1) {
      //this.changeDefautAddress(0);
    }
  }

  addNewOrder(order) {
    this.orderList.push(order);
  }

  updateAddressOnFirebase(firebaseID, name, phoneNumber, city, detailAddress) {
    if (user.uid !== '') {
      firebase.database().ref(`users/${user.uid}/addressList/${firebaseID}`)
        .update({
          name, phoneNumber, city, detailAddress
        })
        .then(() => console.log('updated'));
    }
  }

  editAddress(id, name, phoneNumber, city, detailAddress) {
    this.addressList[id].name = name;
    this.addressList[id].phoneNumber = phoneNumber;
    this.addressList[id].city = city;
    this.addressList[id].detailAddress = detailAddress;
  }

  removeAddressFromFirebase(firebaseID) {
    if (user.uid !== '') {
      firebase.database().ref(`users/${user.uid}/addressList/${firebaseID}`)
        .remove()
        .then(() => console.log('remove ' + firebaseID));
    }
  }

  removeAddress(id) {
    for (var i = 0; i < this.addressList.length; i++) {
      if (i === id) {
        this.addressList.splice(i, 1);
        if (this.defaultAddressId === id) {
          //console.log('ayyyy');
          if (this.addressList.length === 0) {
            //this.defaultAddressId = -1;
            this.changeDefautAddress(-1)
          }
          else {
            //this.defaultAddressId = 0;
            this.changeDefautAddress(0)
            //console.log('yooo');
          }
        }
        else if (this.defaultAddressId > id) {
          //this.defaultAddressId--;
          this.changeDefautAddress(this.defaultAddressId - 1);
        }
        return;
      }
    }
  }

  changeDefautAddress(id) {
    firebase.database().ref(`users/${user.uid}/defaultAddressId`)
      .set(id).then(() => console.log('set ne'));
    this.defaultAddressId = id;
  }

}
