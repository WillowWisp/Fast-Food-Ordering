import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from 'native-base';

const LocationCard = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.place.title}</Text>
        <View>
          <Text style={styles.address}>{props.place.address}</Text>
          <Text style={styles.open}>Open: {props.place.open} - {props.place.close}</Text>
        </View>
      </View>
      <TouchableHighlight style={styles.button} onPress={props.onGotoPress} underlayColor="#51ff65">
        <Icon name="md-arrow-round-forward" active style={{color: "white", fontSize: 35}} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 120,
    elevation: 2,
    borderWidth: 0,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 4
  },
  textContainer: {
    flex: 4,
    //backgroundColor: '#ccc',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38ff4f',
    elevation: 0,
    marginTop: 2,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e87330"
  },
  address: {
    color: "#444",
  },
  open: {
    color: "#00b536",
    //fontSize: 16,
    fontWeight: "500",
  }
});

export default LocationCard;