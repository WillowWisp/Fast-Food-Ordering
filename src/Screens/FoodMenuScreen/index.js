import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title } from 'native-base';

import { foodData } from './data';
import FoodCard from './FoodCard';
import FoodDetail from './FoodDetailScreen/FoodDetailScreen';

export default class DynamicListExample extends Component {
  // state = {
  //   popupIsOpen: false,
  // }

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
        <Content>
          <List dataArray={foodData}
            renderRow={(food) =>
              <ListItem noIndent style={{borderBottomWidth: 0, backgroundColor: "#ddd"}}>
                <FoodCard
                  food={food}
                  onOpen={this.openFood}
                />
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
