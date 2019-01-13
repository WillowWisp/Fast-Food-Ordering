import Food from './Food';
import { Toast } from 'native-base';

export default class Cart {
constructor(FoodList) {
    if (FoodList === undefined) {
      this.FoodList = [];
    }
    else {
      this.FoodList = Array.from(FoodList);
    }
  }

  addFood(food, amount) {
    if (user.uid === '') {
      Toast.show({
        text: "Chức năng này cần đăng nhập.",
        buttonText: "Okay",
      });
      return;
    }

    for (var i = 0; i < this.FoodList.length; i++) {
      if (this.FoodList[i].food.id === food.id) {
        this.FoodList[i].amount += amount;
        return;
      }
    }
    this.FoodList.push({food, amount});

    Toast.show({
      text: "Đã thêm hàng vào giỏ!",
      buttonText: "Okay",
      type: "success",
    });
  }

  removeFood(id) {
    for (var i = 0; i < this.FoodList.length; i++) {
      //console.log(this.FoodList[i].food.id, id);
      if (this.FoodList[i].food.id === id) {
        this.FoodList.splice(i, 1);
        return;
      }
    }
  }

  increaseFoodAmount(id) {
    for (var i = 0; i < this.FoodList.length; i++) {
      //console.log(this.FoodList[i].food.id, id);
      if (this.FoodList[i].food.id === id) {
        this.FoodList[i].amount++;
        return;
      }
    }
  }
  decreaseFoodAmount(id) {
    for (var i = 0; i < this.FoodList.length; i++) {
      //console.log(this.FoodList[i].food.id, id);
      if (this.FoodList[i].food.id === id) {
        if (this.FoodList[i].amount > 1) {
          this.FoodList[i].amount--;
        }
        return;
      }
    }
  }

  getTotalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < this.FoodList.length; i++) {
      totalPrice += this.FoodList[i].food.getIntPrice() * this.FoodList[i].amount;
    }
    //console.log(totalPrice);
    return totalPrice;
  }

  emptyCart() {
    this.FoodList.length = 0;
  }

  getShortenedAllFood() {
    if (this.FoodList.length === 0)
      return '';
    var str = this.FoodList[0].food.title;
    if (this.FoodList.length > 1)
      str += "...và " + (this.FoodList.length - 1).toString() + " món ăn khác";
    console.log('this.FoodList[0]');
    return str;
  }

}
