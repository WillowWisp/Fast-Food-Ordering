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

}
