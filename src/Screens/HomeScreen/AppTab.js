import React from 'react';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';

class AppTab extends React.Component {
  constructor() {
    super();

    this.state = {}
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
            <Button onPress={() => this.props.navigation.navigate('FAQ')}>
              <Text>Go to FAQ</Text>
            </Button>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

export default AppTab;