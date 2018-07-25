import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform,FlatList} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body,Card, CardItem,Thumbnail,Input, Item} from "native-base";
import StarRating from 'react-native-star-rating';


import styles from "./styles";
import Images from "@theme/images/images";
import MyColors from "@colors/myColor";

var data =[
  {
    "id": "1",
    "trainersName": "John A",
    "trainersImage": "sampleImage",
    "rating": 0
  },
  {
    "id": "2",
    "trainersName": "John B",
    "trainersImage": "sampleImage",
    "rating": 0
  },
  {
    "id": "3",
    "trainersName": "John C",
    "trainersImage": "sampleImage",
    "rating": 0
  },
  {
    "id": "4",
    "trainersName": "John D",
    "trainersImage": "sampleImage",
    "rating": 0
  }
]
class ClientRating extends Component {
  constructor(props){
    super(props);
    this.state ={
      data: data
    }
  }
  onStarRatingPress(item,rating) {
    data.map((res,i)=>{
      console.log("resIddddd :  ", JSON.stringify(res.id), "     item:", JSON.stringify(item))
      if(res.id === item.item.id){
        res.rating = rating
      }
    })
    this.setState({data: data})
  }
  renderData(item){
    return(
      <View style={{flex:1}}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={Images.user} />
              <Body>
                <Text>{item.item.trainersName}</Text>
              </Body>
            </Left>
            <Right>
              <View style={{display:"flex"}}>
                <Text> Rating </Text>
                <StarRating
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  maxStars={5}
                  starSize={25}
                  rating={item.item.rating}
                  selectedStar={this.onStarRatingPress.bind(this,item)}
                  fullStarColor={MyColors.blue}
                />
              </View>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Item regular>
                <Input placeholder='Comment' />
              </Item>
            </Left>
          </CardItem>
        </Card>
      </View>
    )
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
              <Title style={styles.title}>Client-Rating</Title>
            </Body>
            <Right/>
          </Header>
          <Content>
            <View style={styles.contentStyle}>
              <View style={styles.rateYourTrainerTextStyle}>
                <Text style={{color:MyColors.blue,fontSize:16}}> {"Rate Your Past Trainer's"} </Text>
              </View>
              <FlatList
                data={this.state.data}
                keyExtractor={(x, i) => x.id}
                renderItem={this.renderData.bind(this)}
                extraData={this.state}
                />
            </View>
          </Content>
        </Container>
      );
  }
}

export default ClientRating;
