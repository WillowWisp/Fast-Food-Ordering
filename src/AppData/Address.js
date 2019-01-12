export default class Address {
  constructor(name, phoneNumber, city, detailAddress) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.detailAddress = detailAddress;
  }

  getFullAddress() {
    return this.detailAddress + ", " + this.city;
  }
}
