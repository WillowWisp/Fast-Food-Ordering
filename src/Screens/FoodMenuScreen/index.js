import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title } from 'native-base';

import { foodData } from './data';
import FoodCard from './FoodCard';
export default class DynamicListExample extends Component {
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
            renderRow={(item) =>
              <ListItem noIndent style={{borderBottomWidth: 0, backgroundColor: "#ddd"}}>
                <FoodCard
                  title={item.title}
                  poster={item.poster}
                  price={item.price}
                  weight={item.weight}>
                </FoodCard>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}
