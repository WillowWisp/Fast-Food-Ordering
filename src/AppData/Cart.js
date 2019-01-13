import Food from './Food';
import { Toast } from 'native-base';
import firebase from 'firebase';

export default class Cart {
constructor(FoodList) {
    if (FoodList === undefined) {
      this.FoodList = [];
    }
    else {
      this.FoodList = Array.from(FoodList);
    }
  }

  addFoodToFirebase(food, amount) {
    if (user.uid !== '') {

      let found = false;

      const ref = firebase.database().ref(`users/${user.uid}/cart/FoodList`);

      ref.once('value', snapshot => {
        if (snapshot.val() !== null) {
          console.log(snapshot.val());
          const fetchedData = snapshot.val();
          Object.keys(snapshot.val()).forEach(key => {
            if (fetchedData[key].food.id === food.id) {
              //Nếu đã có food id này thì tăng amount
              found = true;
              const newAmount = fetchedData[key].amount + amount;
              firebase.database().ref(`users/${user.uid}/cart/FoodList/${key}`)
                .update({ amount: newAmount });
            }
          });
        }
      }).then(() => {
        if (found === false) {
          ref.push({
            food: food,
            amount: amount,
          })
            .then(() => console.log('da them hang'));
        }
      });
    }
  }

  addFood(food, amount) {
    for (var i = 0; i < this.FoodList.length; i++) {
      if (this.FoodList[i].food.id === food.id) {
        this.FoodList[i].amount += amount;
        
        Toast.show({
          text: "Đã thêm hàng vào giỏ!",
          buttonText: "Okay",
          type: "success",
        });

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

  removeFoodOnFirebase(id) {
    const ref = firebase.database().ref(`users/${user.uid}/cart/FoodList`);
    ref.once('value', snapshot => {
      const fetchedData = snapshot.val();
      Object.keys(fetchedData).forEach(key => {
        if (fetchedData[key].food.id === id) {
          //Tìm id và xóa
          firebase.database().ref(`users/${user.uid}/cart/FoodList/${key}`)
            .remove();
        }
      })
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

  increaseFoodAmountOnFirebase(id) {
    const ref = firebase.database().ref(`users/${user.uid}/cart/FoodList`);
    ref.once('value', snapshot => {
      const fetchedData = snapshot.val();
      Object.keys(fetchedData).forEach(key => {
        if (fetchedData[key].food.id === id) {
          //Tìm id và tăng amount
          const newAmount = fetchedData[key].amount + 1;
          firebase.database().ref(`users/${user.uid}/cart/FoodList/${key}`)
            .update({ amount: newAmount });
        }
      })
    });
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

  decreaseFoodAmountOnFirebase(id) {
    const ref = firebase.database().ref(`users/${user.uid}/cart/FoodList`);
    ref.once('value', snapshot => {
      const fetchedData = snapshot.val();
      Object.keys(fetchedData).forEach(key => {
        if (fetchedData[key].food.id === id) {
          //Tìm id và tăng amount
          if (fetchedData[key].amount > 1) {
            const newAmount = fetchedData[key].amount - 1;
            firebase.database().ref(`users/${user.uid}/cart/FoodList/${key}`)
              .update({ amount: newAmount });
          }
        }
      })
    });
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
