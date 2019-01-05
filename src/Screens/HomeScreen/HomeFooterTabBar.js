import React from 'react';
import { Footer, FooterTab, Button, Icon, Text, StyleProvider } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import customizedTheme from '../../../native-base-theme/variables/variables';

const HomeFooterTabBar = (props) => {
  return(
    <StyleProvider style={getTheme(customizedTheme)}>
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() => props.navigation.navigate('App')}
            active={props.navigation.state.index === 0}
          >
            <Icon name="apps" />
            <Text>Apps</Text>
          </Button>
          <Button
            vertical
            onPress={() => props.navigation.navigate('Settings')}
            active={props.navigation.state.index === 1}
          >
            <Icon name="compass" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    </StyleProvider>
  );
}

export default HomeFooterTabBar;