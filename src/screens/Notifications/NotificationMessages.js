import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body,Tab, Tabs,ScrollableTab} from "native-base";

import Images from "@theme/images/images";
import Inbox from "./Inbox";
import SentDrafts from "./SentDrafts";

class NotificationMessages extends Component {
  constructor(){
    super()
    this.state ={
    }
  }
  onBack(){
    this.props.navigation.navigate("Notifications")
  }
  render(){
      return(
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button transparent onPress={this.onBack.bind(this)}>
    						<Icon name="ios-arrow-back" style={{color: "white"}}/>
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Messages</Title>
            </Body>
            <Right/>
          </Header>
          <Content bounces={false}>
            <View style={styles.contentStyle}>
              <Tabs renderTabBar={()=> <ScrollableTab />}>
                <Tab heading="Inbox">
                  <Inbox />
                </Tab>
                <Tab heading="Sent Drafts">
                  <SentDrafts />
                </Tab>
              </Tabs>
            </View>
          </Content>
        </Container>
      );
  }
}

export default NotificationMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerStyle: {
    backgroundColor: "#009FDB"
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  contentStyle: {
    flex: 1
  },
})
