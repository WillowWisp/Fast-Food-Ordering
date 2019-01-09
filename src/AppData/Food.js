export default class Food {
  constructor(id, title, poster, price, weight, type) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.price = price;
    this.weight = weight;
    this.type = type;
  }

  getIntPrice() {
    var priceInt = 0;
    for (var i = 0; i < this.price.length; i++) {
      if (this.price[i] >= '0' && this.price[i] <= '9') {
        priceInt = priceInt * 10 + parseInt(this.price[i]);
        //console.log("a");
      }
    }
    return priceInt;
  }

  intToPrice() {

  }

}
