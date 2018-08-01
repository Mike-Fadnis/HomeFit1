import React, { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ButtonThree } from "../common";
import ImageSlider from "react-native-image-slider";
import { Container,Header,Title,Icon,Button,Left,Right,Body,Spinner} from "native-base";

import styles from "./styles";
import API from "@utils/ApiUtils";
import {IMAGE_PATH} from "@common/global";

class ClientHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      images:[],
      spinner:true
    };
  }
  componentWillMount(){
   this.getImagesList();
 }
  getImagesList(){
     API.getImages().then(async (response) => {
      if (response){
          if (response.status) {
            this.setState({images: response.data,spinner:false});
          } else {
            this.setState({
              spinner:false
            });
              alert("Error");
          }
        } else {
          this.setState({
            spinner:false
          });
          alert("Error");
        }
     });
   }
  render(){
      return (
        <Container style={styles.container}>
            <Header style={styles.headerStyle}>
          <Left style={styles.ham}>
            <Button style={styles.ham}
              transparent
              onPress = {() => this.props.navigation.navigate("DrawerOpen")}>
              < Icon name = "ios-menu" style={{color: "white"}}/ >
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>Home</Title>
          </Body>
          <Right>
              <TouchableOpacity style={styles.trainerTextContainer}
                onPress={() => this.props.navigation.navigate("TrainerLogin")}>
                  <Text style={styles.trainerText}>Trainers</Text>
              </TouchableOpacity>
          </Right>
        </Header>
        <ScrollView>
           <View style={styles.container}>
               <View style={styles.topTextContainer}>
                   <Text style={styles.topText}>
                       Browse through our Personal Trainers
                       and find the one that will be best in
                       helping you reach your fitness goals.
                   </Text>
               </View>
               <View style={styles.browseTrainersContainer}>
                  <View style={styles.buttonContainerStyle}>
                       <ButtonThree onPress={() => this.props.navigation.navigate("FeaturedTrainers")}
                        style={styles.buttonStyle}>
                           View Our Featured Trainers
                       </ButtonThree>
                   </View>
                   <View style={[styles.buttonContainerStyle,{marginTop:5}]}>
                     <ButtonThree onPress={() => this.props.navigation.navigate("BrowseTrainers")}
                      style={styles.buttonStyle}>
                         View Our Personal Trainers
                     </ButtonThree>
                   </View>
                    <View style={styles.trainerSliderStyle}>
                       <ImageSlider autoPlayWithInterval={2500}
                           images={trainerImages.map((album) => album.image) }/>
                    </View>
               </View>
               <View style={styles.topContainer}>
                   <View style={styles.firstPart}>
                       <View style={styles.sessionsContainerStyle}>
                           <Text style={styles.sessionsText}>
                               Group Classes
                           </Text>
                       </View>
                        <View style={styles.sessionSliderStyle}>
                           <ImageSlider
                               images={trainerImages.map((album) => album.image) }/>
                        </View>
                   </View>
                   <View style={styles.secondPart}>
                       <View style={styles.sessionsContainerStyle}>
                           <Text style={styles.sessionsText}>
                               Free Live Sessions
                           </Text>
                       </View>
                        <View style={styles.sessionSliderStyle}>
                           <ImageSlider
                               images={storeImages.map((album) => album.image) }/>
                        </View>
                   </View>
               </View>
               <View style={styles.onlineStore}>
                   <View style={styles.buttonContainerStyle1}>
                       <ButtonThree style={styles.buttonStyle}
                        onPress={() => this.props.navigation.navigate("OnlineStore",{forBack:true})}>
                           ORDER ONLINE
                       </ButtonThree>
                   </View>
                   <View style={styles.topTextContainer}>
                       <Text style={styles.onlineStoreText}>
                           Check out our online store for daily specials
                           and all your supplement and equipment needs.
                       </Text>
                    </View>
                    <View style={[styles.trainerSliderStyle,{height: 200}]}>
                      {this.state.spinner == true ? (
                        <Spinner size="large" color="black"/>
                      )
                        : (<ImageSlider autoPlayWithInterval={3000}
                            images={this.state.images.map((album) => IMAGE_PATH + album.image) }/>
                          )}
                    </View>
               </View>
               <View style={styles.request}>
                   <ButtonThree style={styles.buttonStyle}>
                       Request a 5 minute quick advice
                   </ButtonThree>
               </View>
               <View style={styles.book}>
                   <Text style={styles.bookText}>
                       JOIN NEXT UPCOMING TRAINING SESSION
                   </Text>
               </View>
           </View>
        </ScrollView>
    </Container>
      );
  }
}

export default ClientHome;

const trainerImages = [
    {
        "id" : 3,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/trainer1.jpg"
    },
    {
        "id" : 2,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/trainer2.jpeg"
    },
    {
        "id" : 1,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/trainer3.jpg"
    },
    {
        "id" : 0,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/trainer4.jpeg"
    },
    {
        "id" : 5,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/trainer5.jpg"
    },
    {
        "id" : 6,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/trainer6.jpg"
    }
];

const storeImages = [
    {
        "id" : 3,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product1.jpg"
    },
    {
        "id" : 2,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product2.jpg"
    },
    {
        "id" : 1,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product1.jpeg"
    },
    {
        "id" : 0,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product3.jpg"
    },
    {
        "id" : 5,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product5.jpg"
    },
    {
        "id" : 6,
        "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/product6.jpg"
    }
];
