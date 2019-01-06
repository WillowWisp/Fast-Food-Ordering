import React from 'react';
import firebase from 'firebase';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';

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
            {this.renderContent()}
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default AppTab;