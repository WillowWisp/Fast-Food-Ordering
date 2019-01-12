import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast, Left, Body, Icon, Title } from 'native-base';
import firebase from 'firebase';

class SignUpTab extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  onSignUpPress = () => {
    const { email, password, confirmPassword } = this.state
    if (password != confirmPassword) {
      Toast.show({
        text: 'ConfirmPassword does not match!',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000
      });
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(() => Toast.show({
        text: 'Invalid Email or Password!',
        buttonText: 'Okay',
        type: 'danger',
        duration: 3000
      }));
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
            <Item floatingLabel error={this.state.password != this.state.confirmPassword}>
              <Label>Confirm Password</Label>
              <Input
                secureTextEntry
                onChangeText={newText => this.setState({confirmPassword: newText})}
                value={this.state.confirmPassword}
              />
            </Item>
          </Form>
          <Button success style={{marginTop: 50}} block onPress={this.onSignUpPress}>
            <Text>Đăng ký</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SignUpTab;