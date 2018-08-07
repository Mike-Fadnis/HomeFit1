import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Modal, TouchableOpacity, AsyncStorage, Image, Platform,FlatList,Alert} from 'react-native';
import {Container,Header,Title,Content,Icon,Button,Footer,FooterTab,Left,Right,Body, CardItem,Thumbnail,Input, Item,Spinner} from "native-base";
import StarRating from 'react-native-star-rating';
import { Card, CardSection } from "../common";
import API from "@utils/ApiUtils";
import styles from "./styles";
import Images from "@theme/images/images";
import MyColors from "@colors/myColor";
// var data =[
//   {
//     "id": "1",
//     "trainersName": "John A",
//     "trainersImage": "sampleImage",
//     "rating": 0
//   },
//   {
//     "id": "2",
//     "trainersName": "John B",
//     "trainersImage": "sampleImage",
//     "rating": 0
//   },
//   {
//     "id": "3",
//     "trainersName": "John C",
//     "trainersImage": "sampleImage",
//     "rating": 0
//   },
//   {
//     "id": "4",
//     "trainersName": "John D",
//     "trainersImage": "sampleImage",
//     "rating": 0
//   }
// ]

class ClientRating extends Component {
  constructor(props){
    super(props);
    this.state ={
      data: [],
      spinner:true,
      emptyText:true,
      comment:"",
      starRating:0,
      userData:{},
      loading:false
    }
  }
  onStarRatingPress(item,rating) {
    this.state.data.map((res,i)=>{
      console.log("resIddddd :  ", JSON.stringify(res.id), "     item:", JSON.stringify(item))
      if(res.id === item.item.id){
        res.rating = rating
        this.setState({
          starRating:rating
        })
      }
    })
    this.setState({data: this.state.data})
  }
  componentWillMount(){
    AsyncStorage.getItem("@getUserData:key", (err, getUserData) => {
      var get_user = JSON.parse(getUserData);
    if(get_user != null) {
        console.log("userData",get_user);
        if (get_user){
          this.setState({
            userData:get_user
          })
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
  onChangeComment = (text) => {
    // alert("ghvhj")
    this.setState({
      comment:text
    })
  }
  onSubmit(item){
    this.setState({
      loading:true
    })
    var data = {
        user_id:this.state.userData.id,
        trainer_id:item.item.id,
        rating:this.state.starRating,
        review:this.state.comment
        }
      API.postClientRatings(data).then(async (response) => {
        // alert(JSON.stringify(response))
        if (response){
          if(response.status === true){
            this.setState({loading:false},()=>{
              Alert.alert(response.message,'')
              this.getClientRating(this.state.userData.id)
            });
          }else{
            this.setState({loading:false},()=>{
              Alert.alert(response.message,'')
            });
            // alert("error");
          }
        } else {
          this.setState({loading:false});
          // alert("error");
        }
      });
  }
  renderData(item){
    var rating=parseInt(item.item.rating)
    var res =  item.item.name.split(" ");
    var firstname = "";
    var lastname = "";
    if (res[1] === undefined) {
        firstname = res[0].charAt(0);
        lastname = "";
    } else {
        firstname = res[0].charAt(0);
        lastname = res[1].charAt(0);
    }
    return(
      <Card>
        <CardSection>
          <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:0.2, alignItems:'center', justifyContent:'center'}}>
          {item.item.image === "" ? (
            <View style={styles.emptyImageStyle}><Text style={styles.emptyImageTextStyle}>{firstname.toUpperCase()}{lastname.toUpperCase()}</Text></View>)
            : (
            <Image style={styles.trainerImage} source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />
            )}
          </View>
          <View style={{flex:0.5, marginLeft:10}}>
          <Text style={[styles.descriptionLine,{marginTop:5}]}>{item.item.name} </Text>
          <StarRating
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            starSize={25}
            rating={rating}
            selectedStar={this.onStarRatingPress.bind(this,item)}
            fullStarColor={MyColors.blue}
            containerStyle={{display:"flex", marginTop:5}}
          />
            <Input placeholder="Comment" style={{borderColor:"grey", borderWidth:1, height:30, marginTop:5, marginBottom:10, fontSize:14}} onChangeText={this.onChangeComment} value={this.state.comment}/>
          </View>
          <View style={{flex:0.3, alignItems:'center', justifyContent:'center', marginLeft:10}}>
            <TouchableOpacity onPress={this.onSubmit.bind(this,item)}>
              <Text style={{fontSize:16, fontWeight:'700', color:MyColors.blue}}>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
        </CardSection>
      </Card>

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
             ) : this.state.emptyText === true ? ( <Text style={{textAlign:'center', marginTop:10,fontWeight:'700', fontSize:16}}> You haven’t had any sessions with any trainers yet whom you can rate. </Text>)
             :(
              <View style={styles.contentStyle}>
            {  /*<View style={styles.rateYourTrainerTextStyle}>
                <Text style={{color:MyColors.blue,fontSize:16}}> {"Rate Your Past Trainer's"} </Text>
              </View>*/}
              <FlatList
                data={this.state.data}
                keyExtractor={(x, i) => x.id}
                renderItem={this.renderData.bind(this)}
                extraData={this.state}
                removeClippedSubviews={false}
                />
              </View>)}
            </View>
          </Content>
          {this.state.loading === true ? (
           <View style={styles.container_spinner}>
             <View style={styles.spinnerView}>
               <Spinner size="large" color="black"/>
             </View>
           </View>
         ) : null}
        </Container>
      );
  }
}

export default ClientRating;
