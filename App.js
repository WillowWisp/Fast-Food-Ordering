import React from 'react';
import { StatusBar, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import AppContainer from './src/AppContainer';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <AppContainer />
    );
  }
}

export default App;