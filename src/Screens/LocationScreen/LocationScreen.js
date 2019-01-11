import React from 'react';
import { MapView } from 'expo';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, StyleProvider, Toast } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';
import { View, StyleSheet, ScrollView } from 'react-native';

import LocationCard from './LocationCard';

const places = [
  {
    id: 1,
    lat: 10.8151266,
    long: 106.7094782,
    title: "Hamburger Nguyễn Xí",
    address: "21 Nguyễn Xí, P.26, Q.Bình Thạnh",
    open: "08:00",
    close: "22:00"
  },
  {
    id: 2,
    lat: 10.7974772,
    long: 106.6884725,
    title: "Hamburger Phan Xích Long",
    address: "1C5 Phan Xích Long, P.7, Q.Phú Nhuận",
    open: "07:30",
    close: "23:30"
  },
  {
    id: 3,
    lat: 10.8498999,
    long: 106.7658424,
    title: "Hamburger Thủ Đức",
    address: "283 Võ Văn Ngân, P.Linh Chiểu, Q.Thủ Đức",
    open: "09:00",
    close: "20:00"
  },
];

export default class LocationScreen extends React.Component {
  state = {
    region: {
      latitude: 10.821268,
      longitude: 106.628556,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  _renderMarker = () => {
    return places.map(place => (
      <MapView.Marker
        coordinate={{latitude: place.lat, longitude: place.long}}
        title={place.title}
        description={place.open + " - " + place.close}
        key={place.id}
      />
    ))
  }

  _renderLocationCards = () => {
    return places.map(place => (
      <LocationCard
        place={place}
        key={place.id}
        onGotoPress={() => {
          this.setState({ 
            region: {
              latitude: place.lat,
              longitude: place.long,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }
          });
        }}
      />
    ))
  }

  _onRegionChange = (newRegion) => {
    this.setState({ region: newRegion });
  }

  render() {
    return (
      <StyleProvider style={getTheme(customizedTheme)}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Locate Us</Title>
            </Body>
            <Right />
          </Header>

          <View style={{flex: 1, flexDirection: 'column'}}>
            <MapView
              style={{flex: 1}}
              region={this.state.region}
              //onRegionChange={this._onRegionChange}
            >
              {this._renderMarker()}
            </MapView>
            <View style={{flex: 1}}>
              <ScrollView>
                {this._renderLocationCards()}
              </ScrollView>
            </View>
            
          </View>
        </Container>
    </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'blue'
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  }
});