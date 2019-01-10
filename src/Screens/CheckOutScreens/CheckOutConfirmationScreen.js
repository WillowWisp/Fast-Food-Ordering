import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right,
          Thumbnail, Button, Icon, Title, Tabs, Tab, TabHeading, Footer, FooterTab } from 'native-base';


export default class CheckOutConfirmationScreen extends Component {
  render() {
    return (
      <Container>
        <Header style={{ height: 70, }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{color: "white", textAlign: 'center',}}>Delivery Address</Text>
          </Body>
          <Right/>
        </Header>
        <View style={{ flex: 1, backgroundColor: "#eeeeee" }}>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <Icon
                name='md-pin'
                style={styles.doneStep}
              />
              <Text style={styles.doneStep}>Shipping</Text>
            </View>
            <View style={styles.step}>
              <Icon
                name='md-card'
                style={styles.doneStep}
              />
              <Text style={styles.doneStep} >Payment</Text>
            </View>
            <View style={styles.step}>
              <Icon
                name='md-checkmark-circle'
                style={styles.doneStep}
              />
              <Text style={styles.doneStep} >Confirm</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref='_scrollView'
          >
          </ScrollView>
          <Button
            full
            warning
            style={{ height: 50, elevation: 6 }}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 18}}>Continue</Text>
            </View>
          </Button>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: "#eeeeee",
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  step: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  doneStep: {
    color: 'blue'
  },
  notDoneStep: {
    color: '#bbbbbb'
  },
});
