import React, { Component } from "react";
import { ImageBackground, View, AsyncStorage, StyleSheet } from "react-native";
//import { createStackNavigator } from 'react-navigation';
import { Container, H3, Text, Footer } from "native-base";
import ImageSlider from 'react-native-image-slider';
import { connect } from 'react-redux';

//import ClientHome from "../ClientHome/";
import { Button, Header } from '../common';
var PushNotification = require('react-native-push-notification');
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
componentWillMount(){
  PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN@@@@@@:',token);
         AsyncStorage.setItem('@token:key', JSON.stringify(token))
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
}
onEnter(){
  AsyncStorage.getItem('@getUserType:key', (err, type) => {
    if(type){
      this.setState({
        userType:type
      },()=>{
        if(type === 'Trainer'){
          this.props.navigation.navigate("TrainerPersonalPage")
        }else{
          this.props.navigation.navigate("ClientHome")
        }
      })
    }else{
      this.props.navigation.navigate("ClientHome")
    }
  })
}
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
        </View>
        <Footer style={{marginTop:25}}>
          <Button full onPress={this.onEnter.bind(this)}>
            Enter
          </Button>
        </Footer>
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

  }
});

export default Landing;
