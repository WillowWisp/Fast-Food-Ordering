import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer,
          FooterTab, Badge, InputGroup, Input } from 'native-base';
import firebase from 'firebase';
import FoodCard from './FoodCard';
import FoodDetail from './FoodDetailScreen/FoodDetailScreen';
import { NavigationEvents } from 'react-navigation';

export default class DynamicListExample extends Component {
  state = {
    activeTab: 'burger',
    badgeText: user.cart.FoodList.length,
    foodData: [],
    isSearching: false,
    searchInput: '',
    searchResult: '',
  }

  componentWillMount() {
    const activeTab = this.props.navigation.getParam('activeTab');
    this.setState({activeTab});
    
    firebase.database().ref('foodMenu/foodData')
      .on('value', snapshot => {
        this.setState({ foodData: snapshot.val() });
      });
  }

  openFood = (food) => {
    // this.setState({
    //   popupIsOpen: true,
    //   food,
    // });
    const changeBadgeText = this.props.navigation.getParam('changeBadgeText');
    this.props.navigation.navigate('FoodDetail', {food})
  }

  closeFood = () => {
    // this.setState({
    //   popupIsOpen: false,
    // });
  }

  changeActiveTab = (newTab) => {
    if (newTab === this.state.activeTab)
      return;
    this.setState({activeTab: newTab});
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: false});
  }

  changeBadgeText = () => {
    const num = user.cart.FoodList.length;
    if (num > 9) {
      this.setState({ badgeText: "*" });
    }
    else {
      this.setState({ badgeText: num.toString() });
    }
  }

  searchFood() {
    const input = this.state.searchInput;
    console.log(input);
    if (input === "" || input === undefined)
      return;
    this.setState({ isSearching: true, searchResult: input });
  }

  render() {
    //const changeBadgeText = navigation.getParam('changeBadgeText');
    //const badgeText = navigation.getParam('badgeText');
    return (
      <Container>
        <Header
          searchBar rounded
          style={{ height: 70, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 25, backgroundColor: '#E3671F' }}
        >
            <TouchableOpacity
              onPress={this.props.navigation.openDrawer}
              style={{ marginRight: 10 }}
            >
              <Icon
                name='menu'
                style={{ color: 'white' }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, marginTop: 5, marginBottom: 5 }}>
            <InputGroup
              style={{ flex: 1, backgroundColor: 'white' }}
            >
              <Icon name='md-search' />
              <Input
                placeholder='Tìm món'
                onChangeText={(searchInput) => this.setState({searchInput})}
                value={this.state.searchInput}
                onSubmitEditing={() => this.searchFood()}
              />
            </InputGroup>
            </View>
            <TouchableOpacity
              style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft: 10, marginBottom: 5}}
              onPress={() => this.props.navigation.navigate('Cart')}
            >
              <Icon
                name='md-cart'
                style={{ color: "white", marginRight: 10, marginTop: 10 }}
              />
              <NavigationEvents
                onWillFocus={this.changeBadgeText}
              />
              <Badge
                style={{ backgroundColor: '#2372F5', alignSelf: 'flex-end', position: 'absolute', scaleX: 0.8, scaleY: 0.8}}
              >
                <Text>{this.state.badgeText}</Text>
              </Badge>
            </TouchableOpacity>
        </Header>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref='_scrollView'
          >
            {this.state.foodData.map((food) =>
              ((!this.state.isSearching && food.type === this.state.activeTab)
                || (this.state.isSearching && food.title.toLowerCase().includes(this.state.searchResult.toLowerCase()))) ?
              <FoodCard
                food={food}
                onOpen={this.openFood}
                key={food.id}
              />
              : null
            )}
          </ScrollView>
          {
            !this.state.isSearching ?
            <Footer>
              <FooterTab
                tabActiveBgColor = "#FF8B49"
                style={{backgroundColor: "#E3671F"}}
              >
                <Button
                  onPress={this.changeActiveTab.bind(this, 'burger')}
                  style={{backgroundColor: this.state.activeTab === 'burger' ? "#FF8B49" : "#E3671F"}}
                >
                  <Image
                    source={require('../../Img/icon-burger.png')}
                    style={styles.icon}
                  />
                  <Text
                    uppercase={false}
                    style={{fontSize: 11, color: "white"}}
                  >Hamburger</Text>
                </Button>
                <Button
                  onPress={this.changeActiveTab.bind(this, 'pizza')}
                  style={{backgroundColor: this.state.activeTab === 'pizza' ? "#FF8B49" : "#E3671F"}}
                >
                  <Image
                    source={require('../../Img/icon-pizza.png')}
                    style={styles.icon}
                  />
                  <Text
                    uppercase={false}
                    style={{fontSize: 11, color: "white"}}
                  >Pizza</Text>
                </Button>
                <Button
                  onPress={this.changeActiveTab.bind(this, 'drink')}
                  style={{backgroundColor: this.state.activeTab === 'drink' ? "#FF8B49" : "#E3671F"}}
                >
                  <Image
                    source={require('../../Img/icon-coke.png')}
                    style={styles.icon}
                  />
                  <Text
                    uppercase={false}
                    style={{fontSize: 11, color: "white"}}
                  >Đồ uống</Text>
                </Button>
                <Button
                  onPress={this.changeActiveTab.bind(this, 'other')}
                  style={{backgroundColor: this.state.activeTab === 'other' ? "#FF8B49" : "#E3671F"}}
                >
                  <Image
                    source={require('../../Img/icon-hotdog.png')}
                    style={styles.icon}
                  />
                  <Text
                    uppercase={false}
                    style={{fontSize: 11, color: "white"}}
                  >Khác</Text>
                </Button>
              </FooterTab>
            </Footer>
            : null
          }
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,         // start below status bar
  },
  scrollContent: {
    paddingBottom: 10,
    flexDirection: 'column',   // arrange posters in rows
    flexWrap: 'wrap',       // allow multiple rows
  },
  icon: {
    width: 28,
    height: 28,
  }
});
