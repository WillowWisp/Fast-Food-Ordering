import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab, Badge } from 'native-base';

import { foodData } from './data';
import FoodCard from './FoodCard';
import FoodDetail from './FoodDetailScreen/FoodDetailScreen';
import { NavigationEvents } from 'react-navigation';

export default class DynamicListExample extends Component {
  state = {
    activeTab: 'burger',
    badgeText: user.cart.FoodList.length,
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

  render() {
    //const changeBadgeText = navigation.getParam('changeBadgeText');
    //const badgeText = navigation.getParam('badgeText');
    return (
      <Container>
        <Header style={{ height: 70, }}>
          <Left>
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Food Menu</Title>
          </Body>
          <Right>
            <TouchableOpacity
              style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}
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
                style={{ alignSelf: 'flex-end', position: 'absolute', scaleX: 0.8, scaleY: 0.8}}
              >
                <Text>{this.state.badgeText}</Text>
              </Badge>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref='_scrollView'
          >
            {foodData.map((food) => food.type === this.state.activeTab ?
              <FoodCard
                food={food}
                onOpen={this.openFood}
                key={food.id}
              />
              : null
            )}
          </ScrollView>
          <Footer>
            <FooterTab
              tabActiveBgColor = "#E79A00"
              style={{backgroundColor: "#FFAA00"}}
            >
              <Button
                onPress={this.changeActiveTab.bind(this, 'burger')}
                style={{backgroundColor: this.state.activeTab === 'burger' ? "#CD8800" : "#FFAA00"}}
              >
                <Text style={{fontFamily: 'Roboto', fontSize: 14, color: "white"}}>Burger Icon</Text>
              </Button>
              <Button
                onPress={this.changeActiveTab.bind(this, 'pizza')}
                style={{backgroundColor: this.state.activeTab === 'pizza' ? "#CD8800" : "#FFAA00"}}
              >
                <Text style={{fontFamily: 'Roboto', fontSize: 14, color: "white"}}>Pizza Icon</Text>
              </Button>
              <Button
                onPress={this.changeActiveTab.bind(this, 'drink')}
                style={{backgroundColor: this.state.activeTab === 'drink' ? "#CD8800" : "#FFAA00"}}
              >
                <Text style={{fontFamily: 'Roboto', fontSize: 14, color: "white"}}>Drink Icon</Text>
              </Button>
              <Button
                onPress={this.changeActiveTab.bind(this, 'other')}
                style={{backgroundColor: this.state.activeTab === 'other' ? "#CD8800" : "#FFAA00"}}
              >
                <Text style={{fontFamily: 'Roboto', fontSize: 14, color: "white"}}>Other Icon</Text>
              </Button>
            </FooterTab>
          </Footer>
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
});
