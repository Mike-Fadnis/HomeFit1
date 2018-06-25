import React, { Component } from "react";
import { ImageBackground, View, StatusBar, StyleSheet } from "react-native";
//import { createStackNavigator } from 'react-navigation';
import { Container, H3, Text } from "native-base";
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux';
//import ClientHome from "../ClientHome/";
import { Button, Header } from '../common';

state = {
  
};

const libraries  = [
  {
      "id" : 3,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/image4.jpeg"
  },
  {
      "id" : 2,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/image3.jpeg"
  },
  {
      "id" : 1,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/image2.jpeg"
  },
  {
      "id" : 0,
      "image" : "https://ajaypalsidhu.com/demo/HomeFit/Admin/uploads/image1.jpeg"
  }
]; 

class Landing extends Component {
    static navigationOptions = {
        title: 'Landing',
      };

  render() {
    
    return (
      <Container style={styles.container}>
        <Header headerText="HomeFit" />
        <View>
          <View style={styles.sliderStyle}>
              <ImageSlider autoPlayWithInterval={3000}
                  images={libraries.map((album) => album.image) }/>
          </View>
          <View style={styles.lowerContainer}>
              <View style={styles.cardStyle}>
                  <Text style={styles.subTitle}>
                      One Stop Shop For All Your Gym Needs!
                  </Text>
              </View>
              <View style={styles.lowerTextContainer}>
                  <Text style={styles.lowerText}>
                      Browse our professaional trainers!
                  </Text>
              </View>
              <View style={styles.lowerTextContainer}>
                  <Text style={styles.lowerText}>
                      Have video consultations with them!
                  </Text>
              </View>
              <View style={styles.lowerTextContainer}>
                  <Text style={styles.lowerText}>Pay by the hour!</Text>
              </View>
              <View style={styles.lowerTextContainer}>
                  <Text style={styles.lowerText}>Buy the best products!</Text>
              </View>
          </View>
          <View style={styles.buttonStyle}>
              <Button onPress={
                () => this.props.navigation.navigate("ClientHome")}>
                  Enter
              </Button>
          </View>
        </View>
      </Container>
    );
  }
}




const styles=StyleSheet.create({
  container : {
    backgroundColor : '#fff'
  },
  sliderStyle : {
      width: '100%', 
      height: 315 ,
      marginTop: 10
  },
  subTitle : {
      color : '#fff',
      fontSize : 18,
      lineHeight : 60,
      alignItems : 'center',
      fontWeight : "800",
      shadowColor : '#000',
      shadowOffset : { width : 0, height : 2 },
      shadowOpacity : 0.8,
      elevation : 2,
      position : 'relative'
  },
  lowerContainer : {
    //height : '100%'
  },
  cardStyle : {
      marginTop : 10,
      height : 60,
      borderRadius : 5,
      justifyContent : 'center',
      marginLeft : 5,
      marginRight : 5,
      alignItems : 'center',
      backgroundColor  : '#009FDB',
      shadowColor : '#000',
      shadowOffset : { width : 0, height : 2 },
      shadowOpacity : 0.8,
      elevation : 2,
      position : 'relative'
  },
  lowerTextContainer : {
      paddingTop : 10,
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#fff'
  },
  lowerText : {
      fontSize : 17,
      color : '#009FDB',
      fontWeight : "600",
      
  },
  buttonStyle : {
      flexDirection : 'row',
      marginTop : 30
  }
});

export default Landing;
