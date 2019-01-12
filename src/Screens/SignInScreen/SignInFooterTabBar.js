import React from 'react';
import { Footer, FooterTab, Button, Icon, Text, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';

const SignInFooterTabBar = (props) => {
  return(
    <StyleProvider style={getTheme(customizedTheme)}>
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() => props.navigation.navigate('SignIn')}
            active={props.navigation.state.index === 0}
          >
            <Icon name="apps" />
            <Text>Sign In</Text>
          </Button>
          <Button
            vertical
            onPress={() => props.navigation.navigate('SignUp')}
            active={props.navigation.state.index === 1}
          >
            <Icon name="user-plus" type='FontAwesome' />
            <Text>Sign Up</Text>
          </Button>
        </FooterTab>
      </Footer>
    </StyleProvider>
  );
}

export default SignInFooterTabBar;