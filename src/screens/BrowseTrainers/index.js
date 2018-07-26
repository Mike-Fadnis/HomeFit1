import React, { Component } from "react";
import {Container,Header,Title,Content,Spinner,Icon,Button,Footer,FooterTab,Left,Right,Body,Input} from "native-base";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, FlatList } from 'react-native';

import { Card, CardSection } from '../common';
import styles from "./styles";
import API from "@utils/ApiUtils";
import Images from "@theme/images/images";

// var trainersList = [
//   {
//     "id": "1",
//     "name": "John Doe A",
//     "rating":"7.5",
//     "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries "
//   },
//   {
//     "id": "2",
//     "name": "John B",
//     "rating":"8",
//     "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
//   },
//   {
//     "id": "3",
//     "name": "John Doe C",
//     "rating":"8.5",
//     "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
//   },
//   {
//     "id": "4",
//     "name": "John D",
//     "rating":"9",
//     "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
//   },
//   {
//     "id": "5",
//     "name": "John Doe E",
//     "rating":"7",
//     "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
//   }
// ]

var trainersList = []

class BrowseTrainers extends Component {
  constructor(props){
    super(props);
    this.state={
      trainersList: trainersList,
      spinner: true,
      text:""
    }
    this.arrayholder = []
  }
async componentWillMount(){
  this.fetchTrainerList();
}
fetchTrainerList(){
  API.getTrainerList().then(async (response) => {
    if(response){
      this.setState({trainersList: response.data,spinner:false},()=>{
       this.arrayholder = this.state.trainersList
     })
    }else{
      this.setState({spinner:false})
      alert("error")
    }
  })
}

componentDidMount() {
   this.arrayholder = this.state.trainersList
 }
 SearchFilterFunction(text) {
   const newData = this.arrayholder.filter(function(item) {
     const itemData = item.name.toUpperCase()
     const textData = text.toUpperCase()
     return itemData.indexOf(textData) > -1
   })
   this.setState({
     trainersList: newData,
     text: text
   })
 }

renderData(item){
  var res =  item.item.name.split(" ");
  var firstname = '';
  var lastname = '';
  if (res[1] === undefined) {
      firstname = res[0].charAt(0);
      lastname = '';
  } else {
      firstname = res[0].charAt(0);
      lastname = res[1].charAt(0);
  }
  return (
  <Card onPress={() => this.props.navigation.navigate("ViewTrainer",{trainersList: item})}>
    <CardSection>
        <View style={styles.trainerImage}>
          {item.item.image === "" ? (
            <View style={styles.emptyImageStyle}><Text style={styles.emptyImageTextStyle}>{firstname.toUpperCase()}{lastname.toUpperCase()}</Text></View>
              ):(
                <Image style={styles.trainerImage} source={{uri : 'https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg'}} />
                )
          }
        </View>
        <View style={styles.trainerDescription}>
            <Text style={styles.descriptionLine}> Name : {item.item.name} </Text>
            <Text style={styles.descriptionLine}> Rating : {item.item.avg_rating.substring(0, item.item.avg_rating.length - 3)}/10 </Text>
            <View style={{flex: 1}}>
              <Text numberOfLines={2} style={styles.descriptionLine3}>
                  {item.item.review}
              </Text>
            </View>
        </View>
    </CardSection>
  </Card>
  )
}
render() {
  return (
    <Container style={styles.container}>
      <Header style={styles.headerStyle}>
        <Left style={styles.ham}>
          <Button style={styles.ham} transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="ios-menu" style={{color: "white"}}/>
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>Browse</Title>
        </Body>
        <Right />
      </Header>
      {this.state.spinner === true ? (
         <View style={styles.container_spinner}>
           <Spinner size="large" color="black"/>
         </View>
       ) : (
        <Content padder>
          <View style={styles.container}>
            <Card>
              <CardSection>
                <View style={{flex:1, backgroundColor:'transparent'}}>
                 <Input placeholder="Search by name"
                   placeholderTextColor="grey" value={this.state.text} onChangeText={this.SearchFilterFunction.bind(this)}/>
               </View>
              </CardSection>
            </Card>
            <FlatList
              data={this.state.trainersList}
              keyExtractor={(x, i) => x.id}
              renderItem={this.renderData.bind(this)}
              />
          </View>
        </Content>
      )}
    </Container>
  );
  }
}

export default BrowseTrainers;
