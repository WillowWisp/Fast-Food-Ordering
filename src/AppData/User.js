import Cart from './Cart'
import Address from './Address'

export default class User {
  constructor() {
    //Orderlist
    //VoucherList
    //Email
    //PaymentMethods
    this.addressList = [];
    this.cart = new Cart();
  }

}
