export default class Food {
  constructor(id, title, poster, price, weight, type, ingredients = null, placeId) {
    this.id = id;
    this.title = title;
    this.poster = poster;
    this.price = price;
    this.weight = weight;
    this.type = type;
    this.ingredients = ingredients;
    this.placeId = placeId === undefined ? 0 : placeId;
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

  getFormalizedType() {
    const str = this.type;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
