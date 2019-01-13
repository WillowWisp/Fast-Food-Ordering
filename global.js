import User from './src/AppData/User'

global.user = new User();
global.globalPlaces = [];
global.helper = {
  convertIntToVND: (intNum) => {

    if (intNum === 0) {
      //console.log(num);
      return "0 VNĐ";
    }

    var str = " VNĐ";
    var num = intNum;

    var count = 0;
    //console.log(num);
    while (num > 0) {
      if (count !== 0 && count % 3 === 0)
        str = "," + str;
      str = (num % 10).toString() + str;
      count++;
      num = parseInt(num / 10, 10);
      //console.log(num + "{" + str + "}");
    }
    if (str.length > 0 && str[0] === ',')
      str = str.slice(1, str.length);
    return str;
  },

  isNumberString: (str) => {
    for (var i = 0; i < str.length; i++) {
      if (str[i] < '0' || str[i] > '9')
        return false;
    }
    return true;
  },

  getDeliveryMethod: (deliveryMethod) => {
    //console.log(deliveryMethod);
    switch (deliveryMethod) {
      case 'standard':
        //console.log('s');
        return 'Giao hàng tiêu chuẩn';
        break;
      case 'fast':
        //console.log('f');
        return 'Giao hàng nhanh';
        break;
      default:
        //console.log('d');
        return '';
    }
  },

  getPaymentMethod: (paymentMethod) => {
    switch (paymentMethod) {
      case 'cod':
        return 'Thanh toán tiền mặt khi nhận hàng';
        break;
      default:
        return '';
    }
  },

  getDeliveryCharge: (deliveryMethod) => {
    switch (deliveryMethod) {
      case 'standard':
        return 12000;
        break;
      case 'fast':
        return 22000;
        break;
      default:
        return '';
    }
  },

  getSearchResult: (searchInput, foodData) => {
    var searchResult = [];
    for (var i = 0; i < foodData.length; i++) {
      if (foodData[i].title.includes(searchInput)) {
        searchResult.push(foodData[i]);
      }
    }
    return searchResult;
  }
}
