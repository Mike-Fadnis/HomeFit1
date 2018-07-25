import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body} from "native-base";

import styles from "./styles";
import Images from "@theme/images/images";


class Notifications extends Component {
  constructor(){
    super()
    this.state ={
    }
    this.onMessages = this.onMessages.bind(this)
    this.onAlerts = this.onAlerts.bind(this)
  }
  onAlerts(){
    alert("Alerts")
  }
  onMessages(){
    this.props.navigation.navigate("NotificationMessages")
  }
  render(){
      return(
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name = "ios-menu" style={{color: "white"}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Notifications</Title>
            </Body>
            <Right/>
          </Header>
          <Content scrollEnabled={false}>
            <View style={styles.contentStyle}>
              <View style={styles.buttonsView}>
                <Button full style={{backgroundColor:"#009FDB",marginTop:25}} onPress={this.onAlerts}>
                  <Text style={{fontSize:18,fontWeight:"900",color:"white"}}>Alerts</Text>
                </Button>
                <Button full style={{backgroundColor:"#009FDB",marginTop:5}} onPress={this.onMessages}>
                  <Text style={{fontSize:18,fontWeight:"900",color:"white"}}>Messages</Text>
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      );
  }
}

export default Notifications;
