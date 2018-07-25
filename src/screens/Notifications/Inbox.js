import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform,Dimensions,FlatList} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body,Tab, Tabs,ScrollableTab} from "native-base";
import {ListItem} from 'react-native-elements';

import Images from "@theme/images/images";
import myColors from "@colors/myColor";
import Inbox from "./Inbox";
var data = [
  {
    "id": "1",
    "name": "John Doe A",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
  {
    "id": "2",
    "name": "John Doe B",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
  {
    "id": "3",
    "name": "John Doe C",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
  {
    "id": "4",
    "name": "John Doe D",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
  {
    "id": "5",
    "name": "John Doe E",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
  {
    "id": "6",
    "name": "John Doe F",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
  {
    "id": "7",
    "name": "John Doe G",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage"
  },
]

class NotificationInbox extends Component {
  constructor(){
    super()
    this.state ={
    }
  }

  renderData(item){
    return(
      <ListItem
          roundAvatar
          title={`${item.item.name}`}
          subtitle={item.item.subtitle}
          onPress={this.onInboxMessages.bind(this,item)}
      />
    )
  }
  onInboxMessages(item){
    alert(JSON.stringify(item.item.id))
  }
  render(){
      return(
        <Container style={styles.container}>
          <Content>
            <View style={styles.contentStyle}>
              <View style={{flex:0.3,backgroundColor:"white"}}>
                <FlatList
                  data={data}
                  renderItem={this.renderData.bind(this)}
                  keyExtractor={(x, i) => x.id}
                />
              </View>
            </View>
          </Content>
        </Container>
      );
  }
}
export default NotificationInbox;

const window = Dimensions.get('window');
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
