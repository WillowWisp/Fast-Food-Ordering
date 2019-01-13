import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab } from 'native-base';
import AddressCard from './AddressCard';


export default class AdressListScreen extends Component {
  state = {
    addressList: user.addressList,
  }

  removeAddress = (id) => {
    const firebaseID = user.addressList[id].firebaseID;
    user.removeAddressFromFirebase(firebaseID);

    user.removeAddress(id);
    this.setState({ addressList: user.addressList,
                    choosenRadioButtonId: user.defaultAddressId,
                  });
  }

  onAddressListChanged = () => {
    this.setState({ addressList: user.addressList,
                    choosenRadioButtonId: user.defaultAddressId,
                  });
  }

  render() {
    return (
      <Container>
        <Header style={{ height: 70, }}>
          <Left>
            <Button
              transparent
              onPress={this.props.navigation.openDrawer}
            >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Text style={{color: "white", textAlign: 'center',}}>Sổ địa chỉ</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1, backgroundColor: "#white" }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{ height: 4, backgroundColor: '#eeeeee' }}
            />
            {this.state.addressList.map((address, index) =>
              <View key={index}>
                <AddressCard
                  address={address}
                  id={index}
                  remove={this.removeAddress}
                  navigation={this.props.navigation}
                  onAddressChanged={this.onAddressListChanged}
                />
                <View style={{ height: 1, backgroundColor: '#bbbbbb'}}/>
              </View>
            )}
          </ScrollView>
          <Button
            full
            style={{ height: 50, elevation: 6, backgroundColor: '#F5A623' }}
            onPress={() => this.props.navigation.navigate('NewAddress', { onClose: this.onAddressListChanged })}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>THÊM ĐỊA CHỈ MỚI</Text>
            </View>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: "white",
  },
  addAddressButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});
