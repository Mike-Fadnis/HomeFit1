import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform,FlatList} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body, CardItem, Card,Thumbnail} from "native-base";
import myColors from "@colors/myColor";
import styles from "./styles";
import ModalDesign from "./ModalDesign"
import {ListItem} from 'react-native-elements';
import Images from "@theme/images/images";
var data = [
  {
    "id": "1",
    "name": "John Doe A",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"26/07/2018",
    "timing":"12:00PM - 1:00PM"

  },
  {
    "id": "2",
    "name": "John Doe B",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"28/07/2018",
    "timing":"1:00PM - 2:00PM"

  },
  {
    "id": "3",
    "name": "John Doe C",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"27/07/2018",
    "timing":"2:00PM - 3:00PM"
  },
  {
    "id": "4",
    "name": "John Doe D",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"29/07/2018",
    "timing":"12:00PM - 1:00PM"

  },
  {
    "id": "5",
    "name": "John Doe E",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"31/07/2018",
    "timing":"3:00PM - 4:00PM"

  },
  {
    "id": "6",
    "name": "John Doe F",
    "subtitle": "small sized sub title to read the description",
    "avatar": "sampleImage",
    "date":"31/07/2018",
    "timing":"1:00PM - 2:00PM"

  }
]

class UpcomingSessions extends Component {
  constructor(props){
    super(props);
    this.state ={
      modalVisible:false,
      dataItem:{}
    }
  }
  onClicked(item){
    this.setState({
      dataItem:item
    },()=>{
      this.setState({
        modalVisible:true
      })
    })
  }
  onModalClose(){
    this.setState({
      modalVisible:false
    })
  }
  renderData(item){
      // var item = item.item
      return(
            <ListItem
                roundAvatar
                title={`${item.item.name}`}
                subtitle={item.item.subtitle}
                onPress={this.onClicked.bind(this,item)}
            />
          )
  }
  render(){
    console.log("LKAJSHFGFG: ",this.state.dataItem)
      return(
        <Container style={styles.container}>
          <Header style={styles.headerStyle}>
            <Left style={styles.ham}>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name = "ios-menu" style={{color: "white"}} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>UPCOMINGSESSIONS</Title>
            </Body>
            <Right/>
          </Header>
          <Content>
            <View style={styles.contentStyle}>
              <FlatList
                  data={data}
                  keyExtractor={(x, i) => x.id}
                  extraData={this.state}
                  renderItem={this.renderData.bind(this)}
                  style={{backgroundColor:'#FFFFFF'}}/>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}>
              <View style={styles.modalView}>
            <ModalDesign onClose={this.onModalClose.bind(this)} dataItem={this.state.dataItem}/>
            </View>
            </Modal>
          </Content>
        </Container>
      );
  }
}

export default UpcomingSessions;
