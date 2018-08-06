import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform,FlatList,Alert} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body,Card, CardItem,Thumbnail,Input, Item,Spinner} from "native-base";
import StarRating from 'react-native-star-rating';

import API from "@utils/ApiUtils";
import styles from "./styles";
import Images from "@theme/images/images";
import MyColors from "@colors/myColor";


class ClientRating extends Component {
  constructor(props){
    super(props);
    this.state ={
      data: [],
      spinner:true,
      emptyText:true
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
  componentWillMount(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var get_user = JSON.parse(getUserData);
    if(get_user != null) {
        console.log("userData",get_user);
        if (get_user){
          this.getClientRating(get_user);
        }
        else {

        }
    } else {

    }
    }).done();
  }
  getClientRating(userData){
    console.log("userDDATTTAAA!!!! ",userData)
    API.getClientRating(userData.id).then(async (response) => {
      if (response){
        if(response.status === true){
          this.setState({data: response.data,spinner:false, emptyText:false});
        }else{
          this.setState({spinner:false,emptyText:true});
          // alert("error");
        }
      } else {
        this.setState({spinner:false,emptyText:true});
        // alert("error");
      }
    });
  }
  renderData(item){
    return(
      <View style={{flex:1}}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={Images.user} />
              <Body>
                <Text>{item.item.name}</Text>
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
            {this.state.spinner === true ? (
                 <Spinner size="large" color="black"/>
             ) : this.state.emptyText === true ? ( <Text style={{textAlign:'center', marginTop:10,fontWeight:'700', fontSize:16}}> No Trainers Found. </Text>)
             :(
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
              </View>)}
            </View>
          </Content>
        </Container>
      );
  }
}

export default ClientRating;
