import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab } from 'native-base';

import { foodData } from './data';
import FoodCard from './FoodCard';
import FoodDetail from './FoodDetailScreen/FoodDetailScreen';

export default class DynamicListExample extends Component {
  state = {
    activeTab: 'burger',
  }

  openFood = (food) => {
    // this.setState({
    //   popupIsOpen: true,
    //   food,
    // });
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

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.navigation.openDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Food Menu</Title>
          </Body>
          <Right />
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
