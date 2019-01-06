import React from 'react';
import { Font, AppLoading } from 'expo';
import { Root } from 'native-base';
import firebase from 'firebase';
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
    firebase.initializeApp({
      apiKey: "AIzaSyA-QfZKZnvJ9av1yqXPMZrlgYK94Hx-FmY",
      authDomain: "food-ordering-332bc.firebaseapp.com",
      databaseURL: "https://food-ordering-332bc.firebaseio.com",
      projectId: "food-ordering-332bc",
      storageBucket: "food-ordering-332bc.appspot.com",
      messagingSenderId: "948492691269"
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    }

    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}

export default App;