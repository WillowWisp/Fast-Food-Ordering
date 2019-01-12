import React from 'react';
import { StatusBar } from 'react-native';

import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, StyleProvider, Accordion, Text } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';


const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

class FaqScreen extends React.Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <StyleProvider style={getTheme(customizedTheme)}>
        <Container>
          <StatusBar hidden />
          <Header>
            <Left>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>FAQ</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            <Accordion
              dataArray={dataArray}
              headerStyle={{backgroundColor: '#ffbd68'}}
              contentStyle={{backgroundColor: '#ffe5c6'}}
              expanded={0}
            />
            <Button onPress={() => console.log(user.uid)}>
              <Text>Click</Text>
            </Button>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

export default FaqScreen;