import React, { Component } from "react";
import {Container,Header,Title,Content,Spinner,Icon,Button,Left,Right,Body} from "native-base";
import {  Text, View, Image, FlatList } from "react-native";

import { Card, CardSection } from "../common";
import styles from "./styles";
import API from "@utils/ApiUtils";


class FeaturedTrainers extends Component {
  constructor(props){
    super(props);
    this.state = {
      trainersList:[],
      spinner:true
    };

  }
async componentWillMount(){
  this.fetchTrainerList();
}
fetchTrainerList(){
  API.getFeaturedTrainersList().then(async (response) => {
    if (response){
      this.setState({trainersList: response.data,spinner:false});
    } else {
      this.setState({spinner:false});
      alert("error");
    }
  });
}
renderData(item){
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
  return (
  <Card onPress={() => this.props.navigation.navigate("ViewTrainer",{trainersList: item,keyValue:true})}>
    <CardSection>
        <View style={styles.trainerImage}>
          {item.item.image === "" ? (
            <View style={styles.emptyImageStyle}><Text style={styles.emptyImageTextStyle}>{firstname.toUpperCase()}{lastname.toUpperCase()}</Text></View>
              ) : (
                <Image style={styles.trainerImage} source={{uri : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/gym-trainer1.jpg"}} />
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
  );
}
render() {
  return (
    <Container style={styles.container}>
      <Header style={styles.headerStyle}>
        <Left style={styles.ham}>
          <Button style={styles.ham} transparent onPress={() => this.props.navigation.navigate("ClientHome")}>
              <Icon name="ios-arrow-back" style={{color: "white"}}/>
          </Button>
        </Left>
        <Body>
          <Title style={styles.title}>Featured</Title>
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

export default FeaturedTrainers;
