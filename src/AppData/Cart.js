import Food from './Food';

export default class Cart {
  constructor() {
    this.FoodList = [];
  }

  addFood(food, amount) {
    for (var i = 0; i < this.FoodList.length; i++) {
      if (this.FoodList[i].food.id === food.id) {
        this.FoodList[i].amount += amount;
        return;
      }
    }
    this.FoodList.push({food, amount});
  }

  getTotalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < this.FoodList.length; i++) {
      totalPrice += this.FoodList[i].food.getIntPrice() * this.FoodList[i].amount;
    }
    return totalPrice;
  }

}
