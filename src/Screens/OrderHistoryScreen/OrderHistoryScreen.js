import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab } from 'native-base';
import OrderCard from './OrderCard';


export default class OrderHistoryScreen extends Component {
  state = {
    orderList: user.orderList,
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
            <Text style={{color: "white", textAlign: 'center',}}>Quản lý đơn hàng</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{ height: 4, backgroundColor: '#eeeeee' }}
            />
            {this.state.orderList.map((order, index) =>
              <View key={index}>
                <OrderCard
                  order={order}
                  id={index}
                  navigation={this.props.navigation}
                />
                <View style={{ height: 1, backgroundColor: '#bbbbbb'}}/>
              </View>
            )}
          </ScrollView>
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: "white",
  },
});
