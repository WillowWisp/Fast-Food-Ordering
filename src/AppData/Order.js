import Address from './Address';
import Cart from './Cart';

export default class Order {
  constructor(id, date, status, address, deliveryMethod, paymentMethod, cart) {
    this.id = id;
    this.date = date;
    this.address = address;
    this.deliveryMethod = deliveryMethod;
    this.paymentMethod = paymentMethod;
    this.cart = cart;
  }

  // getDeliveryMethod() {
  //   switch (this.deliveryMethod) {
  //     case 'standard':
  //       return 'Giao hàng tiêu chuẩn';
  //       break;
  //     case 'fast':
  //       return 'Giao hàng nhanh';
  //       break;
  //     default:
  //       return '';
  //   }
  // }
  //
  // getPaymentMethod() {
  //   switch (this.paymentMethod) {
  //     case 'cod':
  //       return 'Thanh toán tiền mặt khi nhận hàng';
  //       break;
  //     default:
  //       return '';
  //   }
  // }
  //
  // getDeliveryCharge() {
  //   switch (this.deliveryMethod) {
  //     case 'standard':
  //       return 12000;
  //       break;
  //     case 'fast':
  //       return 22000;
  //       break;
  //     default:
  //       return '';
  //   }
  // }
}
