import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Footer, FooterTab, StyleProvider } from 'native-base';
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
        <Container style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text onPress={this.props.navigation.openDrawer}>Settings Tab!! Click to open Drawer</Text>
        </Container>
      </StyleProvider>
    );
  }
}

export default AppTab;