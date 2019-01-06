import React from 'react';
import { ImageBackground } from 'react-native';
import firebase from 'firebase';
import { Container, Content, Text, List, ListItem, Left, Icon, Body } from 'native-base';

class SideBar extends React.Component {
  state = {
    currentUser: null,
    routes: ["Home", "FAQ", "SignIn"],
    iconName: ["home", "md-cloud", "wifi"],
    routeName: ["Home", "FAQ", "Sign In"],
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      
      this.checkLoggedInState();
   });

  }

  checkLoggedInState = () => {
    const newRoutes = [...this.state.routes];
    const newIconName = [...this.state.iconName];
    const newRouteName = [...this.state.routeName];

    if (!this.state.currentUser) {
      newRoutes[newRoutes.length - 1] = "SignIn";
      newIconName[newIconName.length - 1] = "wifi";
      newRouteName[newRouteName.length - 1] = "Sign In";
    } else {
      newRoutes[newRoutes.length - 1] = "SignOut";
      newIconName[newIconName.length - 1] = "bluetooth";
      newRouteName[newRouteName.length - 1] = "Sign Out";
    }

    this.setState({ routes: newRoutes, iconName: newIconName, routeName: newRouteName });
  }

  onRoutePress = (route) => {
    if (route === "SignOut") {
      firebase.auth().signOut()
        .then(() => {
          this.props.navigation.closeDrawer();
          this.props.navigation.navigate('Home');
        });
    } else {
      this.props.navigation.navigate(route)
    }
  }

  renderRowItem = (data, secID, rowID) => {
    return (
      <ListItem
        icon
        button
        onPress={() => this.onRoutePress(data)}
        >
        <Left>
          <Icon name={this.state.iconName[rowID]} />
        </Left>
        <Body>
          <Text>{this.state.routeName[rowID]}</Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={{
              uri: "https://png.pngtree.com/element_our/md/20180710/md_5b4443609289b.jpg"
            }}
            style={{
              height: 150,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
          </ImageBackground>
          <List
            dataArray={this.state.routes}
            renderRow={(data, secID, rowID) => this.renderRowItem(data, secID, rowID)}
          />
        </Content>
      </Container>
  );
  }
};

export default SideBar;