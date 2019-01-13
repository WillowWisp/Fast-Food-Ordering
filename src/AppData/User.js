import Cart from './Cart'
import Address from './Address'

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

  addNewAddress(address) {
    if (user.uid === '') {
      Toast.show({
        text: "Chức năng này cần đăng nhập.",
        buttonText: "Okay",
      });

      return false;
    }

    this.addressList.push(address);
    if (this.addressList.length === 1) {
      this.defaultAddressId = 0;
    }

    return true;
  }

  addNewOrder(order) {
    this.orderList.push(order);
  }

  editAddress(id, name, phoneNumber, city, detailAddress) {
    this.addressList[id].name = name;
    this.addressList[id].phoneNumber = phoneNumber;
    this.addressList[id].city = city;
    this.addressList[id].detailAddress = detailAddress;
  }

  removeAddress(id) {
    for (var i = 0; i < this.addressList.length; i++) {
      if (i === id) {
        this.addressList.splice(i, 1);
        if (this.defaultAddressId === id) {
          //console.log('ayyyy');
          if (this.addressList.length === 0) {
            this.defaultAddressId = -1;
          }
          else {
            this.defaultAddressId = 0;
            //console.log('yooo');
          }
        }
        else if (this.defaultAddressId > id) {
          this.defaultAddressId--;
        }
        return;
      }
    }
  }

  changeDefautAddress(id) {
    this.defaultAddressId = id;
  }

}
