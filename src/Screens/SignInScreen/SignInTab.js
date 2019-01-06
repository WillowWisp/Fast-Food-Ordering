import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast, Left, Body, Icon, Title } from 'native-base';
import firebase from 'firebase';

class SignInScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  onSignInPress = () => {
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(() => Toast.show({
        text: 'Wrong email or password!',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000
      }));
  }

  onLoggedInSuccess = () => {

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
              <Title>Sign In</Title>
            </Body>
          </Header>

        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={newText => this.setState({email: newText})}
                value={this.state.email}
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={newText => this.setState({password: newText})}
                value={this.state.password}
              />
            </Item>
          </Form>
          <Button success style={{marginTop: 50}} block onPress={this.onSignInPress}>
            <Text>Sign In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SignInScreen;