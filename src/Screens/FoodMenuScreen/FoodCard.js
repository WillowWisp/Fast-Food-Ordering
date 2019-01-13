import React, { Component, PropTypes } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class FoodCard extends Component {
  // static propTypes = {
  //   // Food object with name, price, poster, ...
  //   food: PropTypes.object.isRequired,
  //   // Called when user taps
  //   onOpen: PropTypes.func.isRequired,
  // }
  render() {
    const { food, food: { title, poster, price, weight, placeId }, onOpen } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => onOpen(food)}
      >
        <View style={{...styles.imageContainer}}>
          <Image
            style={styles.image}
            source={{uri: poster}}
          />
          <View style={styles.imageTextContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{price}</Text>
            </View>
            <View style={{...styles.priceContainer, paddingHorizontal: 5, backgroundColor: 'rgba(0,0,0,0.7)'}}>
              <Text style={styles.weightText}>{weight}</Text>
            </View>
          </View>
        </View>
        <View style={{...styles.layout, backgroundColor: "white"}}>
          <View style={styles.foodTextContainer}>
            <Text style={styles.foodNameText}>
              {title}
            </Text>
            <Text style={styles.infoText}>
              {globalPlaces[placeId].title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 0,
    borderRadius: 10,
    borderColor: 'black',
    borderBottomWidth: 0,
    elevation: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginHorizontal: 10,
    marginTop: 10,
    height: 200,
  },
  layout: {
    flex: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageContainer: {
    flex: 3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
  imageTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 15,
    marginVertical: 15,
    //backgroundColor: "blue",
  },
  priceContainer: {
    // paddingHorizontal: 3,
    // paddingVertical: 1,
    alignSelf:'baseline',
    //marginLeft: 10,
    //marginTop: 10,
    backgroundColor: "#00b327",
    //backgroundColor: '#2372F5',
    borderRadius: 5,
  },
  priceText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginVertical: 2,
    color: 'white',
  },
  weightText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    opacity: 1,
  },
  foodTextContainer: {
    marginHorizontal: 15,
    marginVertical: 12,
  },
  foodNameText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'gray',
  },
});
