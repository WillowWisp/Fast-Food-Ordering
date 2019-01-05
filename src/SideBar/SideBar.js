import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Icon, Body } from 'native-base';

const routes = ["Home", "FAQ"];
const iconArrName = ["home", "md-cloud"];

const SideBar = (props) => {

  const renderRowItem = (data, secID, rowID) => {
    return (
      <ListItem
        icon
        button
        onPress={() => props.navigation.navigate(data)}
        >
        <Left>
          <Icon name={iconArrName[rowID]} />
        </Left>
        <Body>
          <Text>{data}</Text>
        </Body>
      </ListItem>
    );
  }

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
            dataArray={routes}
            renderRow={(data, secID, rowID) => renderRowItem(data, secID, rowID)}
          />
        </Content>
      </Container>
  );
};

export default SideBar;