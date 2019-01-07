import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';
import { View, StyleSheet } from 'react-native'

class AppTab extends React.Component {
  constructor() {
    super();

    this.state = { currentUser: null };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    })
  }

  renderContent = () => {
    if (this.state.currentUser) {
      return (<Text onPress={() => firebase.auth().signOut()}>Hello</Text>);
    }

    return (<Text>Not logged in.</Text>);
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
              <Title>Burger King</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <View style={[styles.container,
                          {flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start'}]}>
              <View style={styles.layout}>
                <Button onPress={() => this.props.navigation.navigate('FAQ')}>
                  <Text>Go to FAQ</Text>
                </Button>
              </View>
              <View style={styles.layout}>
                <Button onPress={() => this.props.navigation.navigate('FoodMenu')}>
                  <Text>Food Menu</Text>
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  }
})

export default AppTab;
