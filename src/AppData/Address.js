export default class Address {
  constructor(name, phoneNumber, city, detailAddress, firebaseID = '') {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.detailAddress = detailAddress;
    this.firebaseID = firebaseID;
  }

  getFullAddress() {
    return this.detailAddress + ", " + this.city;
  }
}
